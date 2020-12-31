const changeColorRecursive = (root, oldColor, newColor) => {
  if (root.style) {
    const backgroundColorStyle = window.getComputedStyle(root).backgroundColor;
    if (backgroundColorStyle) {
      if (rgb2hex(backgroundColorStyle) === oldColor) {
        root.style.backgroundColor = newColor;
      }
    }
  }

  if (root.childNodes) {
    for (var i = 0; i < root.childNodes.length; i++) {
      changeColorRecursive(root.childNodes[i], oldColor, newColor);
    }
  }
};

const rgb2hex = (rgb) => {
  rgb = rgb.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgb && rgb.length === 4
    ? '#' +
        ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : '';
};

export { changeColorRecursive };
