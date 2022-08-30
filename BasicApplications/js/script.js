/**
 * printing mins seconds hours
 * @param {*} $elem
 * @param {*} seconds
 */
 function printTimeComponents($elem, seconds) {
    const [s1, s2] = $elem.querySelectorAll(".digi__box");
    const [sec1, sec2] = seconds.split("");
    s1.className = `digi__box box__1 num__${sec1}`;
    s2.className = `digi__box box__2 num__${sec2}`;
  }