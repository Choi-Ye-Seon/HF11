// Lenis scroll
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 600);
});
gsap.ticker.lagSmoothing(0);




// Header scrollTrigger
let prevScroll = $(window).scrollTop();
// console.log(`처음 prevScrollpols의 값 : ${prevScroll}`);

$(window).scroll(function () {
  currScroll = $(this).scrollTop();
  // console.log(`현재 currScroll의 값 : ${currScroll}`);

  if (currScroll === 0 ) {
    gsap.to('#header',{
      yPercent: 0, 
      backgroundColor: 'transparent'
    });

    // 위로 스크롤
  } else if (prevScroll > currScroll) {
    gsap.to('#header', {
      yPercent: 0, 
      backgroundColor: '#fff'
    });
    // 아래로 스크롤
  } else  {
    gsap.to('#header', {
      yPercent: -100
    });
  }

  prevScroll = currScroll; //스크롤 위치 업데이트
  // console.log(`스크롤을 한 후 prevScroll의 값 : ${prevScroll}`);
});

$('#header .link-menu').click(function (e) {
  e.preventDefault();
  const navLink = $(this).data('target');
  lenis.scrollTo(navLink);
});



// Intro
// Intro title
const headTxt = new SplitType('.sc-intro .intro-title', {types: 'words, chars'});

const intro = gsap.timeline({
  onStart: function () {
    $('html').addClass('fixed');

    lenis.stop();
  },
  invalidateOnRefresh: true
});

intro.to('.sc-intro .intro-title-box > div', 1, {opacity: 1});

let introLines = document.querySelectorAll('.sc-intro .title-line');
introLines.forEach(function (introLine) {
  intro
  .to(introLine.querySelectorAll('.first .char'), {yPercent: -140, stagger: 0.1}, 'a')
  .to(introLine.querySelectorAll('.active .char'), {y: 0, stagger: 0.1}, 'a');
});

intro.to('.sc-intro .intro-footer', {y: 0});

// Intro Btn - hover
const btnHover = gsap.timeline({
  reversed: true,
  defaults: {
    duration: 0.2
  }
});

btnHover.to('.sc-intro .text:first-child', {xPercent: 100}, 'move')
.to('.sc-intro .text.el-pa', {x: 0}, 'move')
.to('.sc-intro .btn__ic img:first-child', {xPercent: 100}, 'move')
.to('.sc-intro .btn__ic img.el-pa', {x: 0}, 'move')
.to('.sc-intro .intro-cover', {autoAlpha: 1, scale: 1, rotate: 0}, 'move');

$('.sc-intro .btn-enter').hover(
  function () {
    btnHover.play();
  },
  function () {
    btnHover.reverse();
  }
);

// Intro Btn - click
const btnClick = gsap.timeline({
  paused: true,
  onComplete: function () {
    $('html').removeClass('fixed');
    heroStart.play();
    lenis.start();
  }
});
// intro text 감추기 모션
introLines = $('.sc-intro .title-line').get();
introLines.forEach(function (introLine) {
  btnClick.to($(introLine).find('.active .char'), {yPercent: -140, stagger: 0.1}, 'a');
});
btnClick.to('.sc-intro .bg-motion', {yPercent: 0});

$('.sc-intro .btn-enter').click(function () {
  btnClick.play();
});



// Hero Start 애니메이션
const heroCapTxt = new SplitType('.sc-hero .hero-bottom .caption-list .text', {types: 'words, chars'});
const heroStart = gsap.timeline({paused: true});
gsap.set('.sc-intro', {autoAlpha: 1});
gsap.set('.sc-intro .bg-motion', {yPercent: 100});
gsap.set('#header, .sc-hero > *', {opacity: 0});
gsap.set('.sc-hero .hero-bottom .caption-item',{y:60});

heroStart
.to('#header', {opacity: 1}, 'show')
.to('.sc-hero > *',{opacity: 1}, 'show')
.to('.sc-hero .hero-bottom .caption-item',{ y:0},'show')

.to('.sc-intro', {autoAlpha: 0}, '<+=0.1');

gsap.set('.sc-hero .hero-bottom .caption-list .text.active .char', {yPercent: 110});
const heroCapLines = document.querySelectorAll('.sc-hero .caption-list .flex-item');
// 텍스트 동시 모션션
heroCapLines.forEach(function (heroCapLine) {
  heroStart
  .to(heroCapLine.querySelectorAll('.first .char'), {yPercent: -110, stagger: 0.1}, 'motion+=.5')
  .to(heroCapLine.querySelectorAll('.active .char'), {yPercent: 0, stagger: 0.1}, 'motion+=.5');
});
  
  // figure, caption 모션
  heroStart
  .to('.sc-hero .hero-bg .hero-img', 2, {yPercent: 100}, 'motion')

  .to('.sc-hero .hero-top .text:first-child span', {yPercent: -110, stagger: 0.1}, 'motion+=.5')
  .to('.sc-hero .hero-top .text.active span', {y: 0, stagger: 0.1}, 'motion+=.5')
  .to('.sc-hero .hero-bottom .title-wrap .text:first-child span', {yPercent: -110, stagger: 0.1}, 'motion+=.5')
  .to('.sc-hero .hero-bottom .title-wrap .text.active span', {y: 0, stagger: 0.1}, 'motion+=.5')
  .to('.sc-hero .hero-bottom .hero-caption .active', {y: 0, stagger: 0.1}, 'motion+=.5')
  .to('.sc-hero .hero-bottom .link-video', {opacity: 1}, 'motion+=.5');

// Hero scrollTrigger
const hero = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-hero',
    start: '0% 0%',
    end: '100% 0%',
    // markers:true,
    scrub: true
  }
});
hero.to('.sc-hero .hero-bg .hero-img', {scale: 1.2}, 'hero');

const hero2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-hero',
    start: '0% 0%',
    end: '100% 50%',
    // markers:true,
    scrub: true
  }
});
hero2.to('.sc-hero .hero-bottom .title-wrap', {y: '-62vh'}, 'hero');



// sc-sound 
const sound = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-sound',
    start: '0% 85%',
    end: '100% 100%',
    // markers:true,
    scrub: true
  }
});

sound.to('.sc-sound .bg-cover', {opacity: 1})
.to('.sc-sound .sound-caption h2 .active', 1.5, {y: 0}, '<+=1')
.to('.sc-sound .sound-caption p', 1.5, {opacity: 1})
.to('.sc-sound .btn-play', {opacity: 1});

const audio = document.querySelector('.sc-sound audio');

$(".sc-sound .btn-play").click(function(){
  audio.muted = false;
  audio.play();
});




// sc-sound / bg-whipe
gsap.to('.sc-sound .bg-whipe', {
  scrollTrigger: {
    trigger: '.sc-sound',
    start: '0% 0%',
    end: '100% 0%',
    scrub: true
    // markers:true
  },
  y: 0
});



// sc-detail / detail-menu 
const detail = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-sound',
    start: 'bottom 60%',
    endTrigger: '.scroll-sticky-parent',
    end: 'bottom bottom',
    // markers:true,
    toggleActions: 'play none none reverse'
  }
});
detail.to('.sc-detail .menu-item', {x: 0, stagger: 0.1});



// sc-about
// 1. 영역 확대/축소
gsap.to('.sc-about', {
  scrollTrigger: {
    trigger: '.gray-wrap',
    start: '0% 70%',
    end: '0% 0%',
    scrub: true
    //   markers:true
  },
  scale: 1
});

// 2. sticky-inner 100vw -> 50vw
gsap.to('.sc-about .sticky-inner', {
  scrollTrigger: {
    trigger: '.sc-about',
    start: '0% 0%',
    endTrigger: '.sc-about .maniacs',
    end: '0% 70%',
    // markers:true,
    scrub: 0
  },
  ease: 'none',
  width: '100%'
});

// fixed 이미지와 content 매칭

$('.sc-about .about-contents .content').each(function(i, el){
  ScrollTrigger.create({
    trigger: $(this),
    start: '0% 15%',
    end: '100% 15%',
    // markers: true,
    toggleActions: "play reverse play reverse",
    onUpdate:function(){
      // console.log(i);
      gsap.to('.sc-about figure',.5, {
        yPercent: -100 * i,
        ease:"none"
      });
      $('.sc-about .about-nav li').eq(i).addClass('active').siblings().removeClass('active');
    }
  });
});


$('.sc-about .about-nav li').click(function () {
  const linkAbout = $(this).data('target');
  lenis.scrollTo(linkAbout);
});


// maniacs bg title 모션
const maniacsBg = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-about .maniacs',
    start: '22% 100%',
    end: '100% 0%',
    scrub: 1
    // markers:true
  }
});
gsap.set('.sc-about .maniacs .text-scroll.left', {xPercent: -10});
gsap.set('.sc-about .maniacs .text-scroll.right', {xPercent: 10});

maniacsBg.to('.sc-about .maniacs .text-scroll.left', {xPercent: 10}, 'a').to('.sc-about .maniacs .text-scroll.right', {xPercent: -10}, 'a');

// maniacs 이미지 시퀀스
gsap.to('.sc-about .maniacs-motion .motion-item', 0, {
  repeat: -1,
  autoAlpha: 1,
  'z-index': 1,
  stagger: 0.3
});

// machine 이미지 시퀀스 
$('.sc-about .group-motion.past .motion-item').each(function (i, el) {
  setTimeout(function () {
    $(el).addClass('active').siblings().removeClass('active');
  }, 1000 * i);
});

setInterval(function () {
  $('.sc-about .group-motion.past .motion-item').each(function (i, el) {
    setTimeout(function () {
      $(el).addClass('active').siblings().removeClass('active');
    }, 1000 * i);
  });
}, $('.sc-about .group-motion.past .motion-item').length * 1000);


// machine 이미지 시퀀스
$('.sc-about .group-motion.time .motion-item').each(function (i, el) {
  setTimeout(function () {
    $(el).addClass('active').siblings().removeClass('active');
  }, 1000 * i);
});

setInterval(function () {
  $('.sc-about .group-motion.time .motion-item').each(function (i, el) {
    setTimeout(function () {
      $(el).addClass('active').siblings().removeClass('active');
    }, 1000 * i);
  });
}, $('.sc-about .group-motion.time .motion-item').length * 1000);


// machine 이미지 시퀀스
$('.sc-about .group-motion.last .motion-item').each(function (i, el) {
  setTimeout(function () {
    $(el).addClass('active').siblings().removeClass('active');
  }, 1000 * i);
});

setInterval(function () {
  $('.sc-about .group-motion.last .motion-item').each(function (i, el) {
    setTimeout(function () {
      $(el).addClass('active').siblings().removeClass('active');
    }, 1000 * i);
  });
}, $('.sc-about .group-motion.last .motion-item').length * 1000);



// MISSION CURSOR
$(".sc-about .swiper.mission").hover(
  function(){
    $("#cursor").addClass('show');
},function(){
  $("#cursor").removeClass('show');
});

$(document).mousemove(function (e) {
  xVal = e.clientX;
  yVal = e.clientY;
  gsap.to('#cursor', {
    x: xVal,
    y: yVal
  });
});

const cursor = document.querySelector('#cursor');
const pos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
const mouse = {x: pos.x, y: pos.y};
const speed = 1;

const xSet = gsap.quickSetter(cursor, 'x', 'px');
const ySet = gsap.quickSetter(cursor, 'y', 'px');

window.addEventListener('pointermove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

gsap.set('#cursor', {xPercent: -50, yPercent: -50});
gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
  pos.x += (mouse.x - pos.x) * dt;
  pos.y += (mouse.y - pos.y) * dt;
  xSet(pos.x);
  ySet(pos.y);
});


// Outro Title
const outroTxt = new SplitType('.sc-outro .title', {types: 'words, chars'});
const outro = gsap.timeline({
  scrollTrigger: {
    trigger: '.sc-outro',
    start: '0% 50%',
    end: '100% 0%',
    // markers: true,
    toggleActions: 'play none none reverse'
  }
});

gsap.set('.sc-outro .title.active .char', {yPercent: 120});

const outroLines = document.querySelectorAll('.sc-outro .title-flex');
outroLines.forEach(function (outroline) {
  outro
  .to(outroline.querySelectorAll('.first .char'), {yPercent: -120, stagger: 0.1}, 'a')
  .to(outroline.querySelectorAll('.active .char'), {yPercent: 0, stagger: 0.1}, 'a');
});

  outro
  .to('.sc-outro .design-el .border-line-h', {width: '70%', stagger: 0.1}, 'design')
  .to('.sc-outro .design-el .border-line-v', {height: '40%', stagger: 0.1}, 'design')
  .to('.sc-outro .design-el .dot', {width: '0.4rem', height: '0.4rem', stagger: 0.1}, 'design');
