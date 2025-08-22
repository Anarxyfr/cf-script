/**
 * [HtmlScript]{@link https://github.com/anarxyfr/cf-script}
 *
 * @version 1.0.0
 * @author anarxyfr
 * @copyright anarxyfr 2025
 * @license MIT
 */

(function() {
  const coffeeScriptSrc = 'https://cdn.jsdelivr.net/npm/coffeescript@2.7.0/lib/coffeescript-browser-compiler-legacy/coffeescript.js';
  let coffeeScriptLoaded = false;

  function loadCoffeeScript(callback) {
    if (coffeeScriptLoaded) {
      callback();
      return;
    }
    const script = document.createElement('script');
    script.src = coffeeScriptSrc;
    script.onload = () => {
      coffeeScriptLoaded = true;
      callback();
    };
    script.onerror = () => console.error('Failed to load CoffeeScript compiler');
    document.head.appendChild(script);
  }

  function transpileAndExecute() {
    loadCoffeeScript(() => {
      const cfTags = document.getElementsByTagName('cf');
      for (let i = 0; i < cfTags.length; i++) {
        const cfTag = cfTags[i];
        const coffeeCode = cfTag.textContent;
        try {
          const jsCode = CoffeeScript.compile(coffeeCode, { bare: true });
          const script = document.createElement('script');
          script.textContent = jsCode;
          cfTag.parentNode.replaceChild(script, cfTag);
        } catch (e) {
          console.error('Error compiling CoffeeScript:', e);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', transpileAndExecute);
  } else {
    transpileAndExecute();
  }
})();
