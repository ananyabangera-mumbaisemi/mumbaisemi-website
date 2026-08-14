// Scroll reveal (consolidated)
(function(){
  var all = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-stagger');
  if(!all.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.10, rootMargin: '0px 0px -50px 0px'});
  all.forEach(function(el){ io.observe(el); });
})();

// Slideshow
(function(){
  var slides = document.querySelectorAll('.dhruva-slide:not(.dhruva-slide-dots)');
  var dots   = document.querySelectorAll('.dhruva-dot');
  var idx = 0;
  function showSlide(n){
    slides.forEach(function(s){
      s.classList.remove('active');
      s.style.position='absolute';
      s.style.opacity='0';
    });
    dots.forEach(function(d){d.classList.remove('active');});
    idx = n; 
    slides[n].classList.add('active');
    slides[n].style.position='relative';
    slides[n].style.opacity='1';
    if(dots[n]) dots[n].classList.add('active');
  }
  window.showSlide = showSlide;
  if(slides.length > 1) setInterval(function(){showSlide((idx+1) % slides.length);}, 4000);
})();

// Mobile nav
(function(){
  var btn = document.getElementById('menuToggle');
  var nav = document.getElementById('navLinks');
  if(btn && nav){
    btn.addEventListener('click', function(){ nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('open'); });
    });
  }
})();

// Contact form
(function(){
  var f = document.getElementById('contactForm');
  if(f) f.addEventListener('submit', function(e){
    e.preventDefault();
    var btn = f.querySelector('.f-submit') || f.querySelector('button[type="submit"]');
    if(!btn) return;
    var originalText = btn.textContent;
    btn.textContent = 'Message sent ✓';
    btn.style.background = '#16A34A';
    btn.disabled = true;
    setTimeout(function(){
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      f.reset();
    }, 4000);
  });
})();

// Scroll progress bar
(function(){
  var bar = document.getElementById('scroll-progress');
  if(!bar) return;
  window.addEventListener('scroll', function(){
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? (scrollTop / docH * 100) : 0;
    bar.style.width = pct + '%';
  }, {passive:true});
})();

// 3D tilt on industry cards
(function(){
  document.querySelectorAll('.industry-card').forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width/2;
      var y = e.clientY - rect.top  - rect.height/2;
      var rx = (y / rect.height * 2) * -4;
      var ry = (x / rect.width  * 2) *  4;
      card.style.transform = 'perspective(800px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = '';
    });
  });
})();

// Sweep heading — add class to visible h2s
(function(){
  document.querySelectorAll('h2').forEach(function(h){
    h.classList.add('sweep-heading');
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:0.3});
  document.querySelectorAll('h2.sweep-heading').forEach(function(el){io.observe(el);});
})();

// Add floating circuit nodes to dark sections
(function(){
  var dark = document.querySelectorAll('#team, #careers, #ecosystem, .hero, #industries');
  var positions = [
    {top:'15%',left:'8%',delay:'0s'},
    {top:'70%',left:'12%',delay:'1.2s'},
    {top:'30%',left:'88%',delay:'0.6s'},
    {top:'80%',left:'82%',delay:'1.8s'},
    {top:'50%',left:'50%',delay:'2.4s'},
  ];
  dark.forEach(function(sec){
    sec.style.position = sec.style.position || 'relative';
    positions.forEach(function(p){
      var node = document.createElement('div');
      node.className = 'circuit-node';
      node.style.cssText = 'top:'+p.top+';left:'+p.left+';animation-delay:'+p.delay+';';
      sec.appendChild(node);
    });
  });
})();