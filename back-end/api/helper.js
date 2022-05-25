exports.clearBlankObject = (obj) => {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === "" || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
}
