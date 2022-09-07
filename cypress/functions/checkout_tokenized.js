export function navigate(url){
    cy.visit(url);
}

export function parseURL(someStr) {
    var parsedStr = someStr.replace(/['"]+/g, '');
    return parsedStr;
}

export function num_format(num) {
    var formattedNum = num.substr(0,3) + " ** *** " + num.substr(num.length - 3);
    return formattedNum;
}

export function parseGetParam(url_string, param) {
    var url = new URL(url_string);
    return url.searchParams.get(param);
}

export function getAmount(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }