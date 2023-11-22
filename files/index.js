
//UAで判別
var isMobile = (function(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.indexOf('ipad') != -1) return true;
  if(ua.indexOf('iphone') != -1) return true;
  if(ua.indexOf('android') != -1) return true;
})();

//レスポンシブ用
var isWideScreen = function() {
	// var _breakPoint = "(max-width: 768px)";
	var _breakPoint = "(max-width: 1023px)";
	if(window["matchMedia"]){
		if (window.matchMedia( _breakPoint ).matches) {return false;}
	}
	return true;
};

function initScroll(){
  //ページ内リンク
  $('.ContentsBox a[href^="#"]').click(function(){
    var target= $(this).attr("href");
    // scrollTo($(target).offset().top - 50);
    scrollTo($(target).offset().top);
    return false;
  });
  function scrollTo(_n){
    $('html,body').animate({
      scrollTop:_n
    },{ duration: 400 });
  }
}

function initScrollAnim(){
  function isInView(element) {
    var rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  function inView(selector, callback) {
    var elements = Array.from(document.querySelectorAll(selector)); 
    function checkInView() {
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if (isInView(element)) {
          callback(element, true);
          elements.splice(i, 1); 
          i--;
        } else {
          callback(element, false);
        }
      }
    }
    checkInView();

    window.addEventListener('scroll', checkInView);
    window.addEventListener('resize', checkInView);
    setInterval(checkInView,100);
  }

  function addClass(element, className) {
    if (!element.classList.contains(className)) {
      element.classList.add(className);
    }
  }
  
  inView('.mod-anim', function(element, isInView) {
    if (isInView) {
      setTimeout(() => addClass(element, 'js-active'),200);
    }
  });
}



var preloadImages = [
  '/cafe/be-a-santa/images/book/btn_bg_ov.png'
];
for (var i = 0; i < preloadImages.length; i++) {
  new Image().src = preloadImages[i];
}

  
$(function(){
  initScroll()
  setTimeout(function(){
    initScrollAnim()
  },1000);
});



//DEV
if(window.location.href.indexOf("/192.168.1.23") != -1){
  window.__dev__ = {
    css : ["index.css"],
    html : true,
    element : []
  }
  //for iframe
  if(window.parent != window){
    window.__dev__.html = false;
   //window.__dev__.reload = false;
    window.__dev__.meta = false;
    window.__dev__.element = [];
    window.__dev__.grid = false;
  }
  var u = "http://192.168.1.23:1000/lib/dev/import.js";
  var s = document.createElement('script');
    s.setAttribute('src',u);
  document.getElementsByTagName('head')[0].appendChild(s);
}




