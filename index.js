let heroes=[];
let cardId;
let i=1;/*page number*/
let t;
const cardElement=document.querySelector('.wrapper');
const modalImage=document.querySelector('.modal-image');
const modalList=document.querySelector('.modal-list');
const nameInfo=document.querySelector('.name');
const statusInfo=document.querySelector('.status');
const speciesInfo=document.querySelector('.species');
const originInfo=document.querySelector('.origin');
const locationInfo=document.querySelector('.location');
const genderInfo=document.querySelector('.gender');
const closeButton=document.querySelector('.btn');
const arrowToTop=document.querySelector('.arrow-to-top');
const loader=document.querySelector('.loader');
const conteinerButton=document.querySelector('.pagination');
const scrollButton=document.querySelector('.closePagination');


closeButton.addEventListener('click', closeModalWindow);
arrowToTop.addEventListener('click', goToTopPage);
scrollButton.addEventListener('click', appearInfiniteScroll);

fetch('https://rickandmortyapi.com/api/character')
.then(res=>res.json())
.then((data)=>{
  heroes=data.results;
  console.log(heroes);
  addHeroToPage(heroes);
  addButtonToPage();
})

function goToNextPage(event) {
  i=+(event.target.textContent);
  console.log(event.target);
  fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
    .then(res=>res.json())
    .then((data)=>{
      heroes=data.results;
      console.log(heroes);
      cardElement.innerHTML="";
      addHeroToPage(heroes);
    });
}

window.addEventListener('load', () => {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
})

function appearInfiniteScroll() {
  conteinerButton.style.display='none';
  window.addEventListener('scroll', () => {
    arrowToTop.style.display='block';
    const documentRect=document.documentElement.getBoundingClientRect();
    console.log(documentRect.bottom);
    if(documentRect.bottom < document.documentElement.clientHeight + 100) {
      loadingNewHero();
    } if (documentRect.top===0) {
      arrowToTop.style.display='none';
    }
  })
}

function addButtonToPage() {
  for(let j=1; j<43; j++) {
    const btn=document.createElement('button');
    btn.classList.add('button-pagination');
    btn.setAttribute("type", "button");
    btn.textContent=j;
    btn.addEventListener('click', goToNextPage);
    conteinerButton.append(btn);
  } 
}

function addHeroToPage(heroes){
  heroes.forEach(hero=>{
  const cardBox=createCardBox(hero);
  const card=createCard();
  const cardImage=createCardImage(hero);
  const cardBody=createCardBody(hero);

  card.append(cardImage, cardBody);
  cardBox.append(card);
  cardElement.append(cardBox);
  return cardBox;
  });
}

function handleShowMoreInformation(event){
  if(event.target.getAttribute('id')){
    cardId=event.target.getAttribute('id');
    console.log(cardId);
    document.querySelector('.modal-box').style.display='block';
    document.body.style.overflow = 'hidden';
    addHeroToModal(heroes,cardId);
    return cardId;
  } if(event.target.parentElement.parentElement.getAttribute('id')){
    cardId=event.target.parentElement.parentElement.getAttribute('id');
    console.log(cardId);
    document.querySelector('.modal-box').style.display='block';
    document.body.style.overflow = 'hidden';
    addHeroToModal(heroes,cardId);
    return cardId;
  } if (event.target.parentElement.parentElement.parentElement.getAttribute('id')){
    cardId=event.target.parentElement.parentElement.parentElement.getAttribute('id');
    console.log(cardId);
    document.querySelector('.modal-box').style.display='block';
    document.body.style.overflow = 'hidden';
    addHeroToModal(heroes,cardId);
    return cardId;
  }
}

function addHeroToModal(heroes,cardId){
  heroes.forEach(hero=>{
    if(hero.id===(+cardId)){
      const modalPicture=createModalPicture(hero);
      const modalName=createModalName(hero);
      const modalStatus=createModalStatus(hero);
      const modalSpecies=createModalSpecies(hero);
      const modalOrigin=createModalOrigin(hero);
      const modalLocation=createModalLocation(hero);
      const modalGender=createModalGender(hero);
      
      modalImage.replaceChildren(modalPicture);
      nameInfo.replaceChildren(modalName);
      statusInfo.replaceChildren(modalStatus);
      speciesInfo.replaceChildren(modalSpecies);
      originInfo.replaceChildren(modalOrigin);
      locationInfo.replaceChildren(modalLocation);
      genderInfo.replaceChildren(modalGender);
      
    }
    return;
  }) 
}

function closeModalWindow(event){
  document.querySelector('.modal-box').style.display='none';
  document.body.style.overflow = 'visible';
}

function loadingNewHero(){
  fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
  .then(res=>res.json())
  .then((data)=>{
    heroes=data.results;
    addHeroToPage(heroes);
  })
  i++;
}
 
function goToTopPage(event) {
	let top = document.documentElement.scrollTop;
	if(top > 0) {
    console.log('hello');
		window.scrollBy(0, -70);
		t = setTimeout('goToTopPage()',20);
	} else clearTimeout(t);
	return false;
}