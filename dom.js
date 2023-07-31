function createCardBox(hero){
  const handlers=[
    {
      event: 'click',
      handler: handleShowMoreInformation,
    }
  ];
  const attributes=[
    {
      prop: 'id',
      value: hero.id,
    }
  ];
  return createElement('div', ['cardBox'], attributes, null, handlers);
}

function createCard(){
  const handlers=[
    {
      event: 'click',
      handler: handleShowMoreInformation,
    }
  ];
  return createElement('div', ['card'], null, null, handlers);
}

function createCardImage(hero){
  const imageAttributes=[
    {
      prop:'src',
      value: hero.image,
    }
  ];
  const handlers=[
    {
      event: 'click',
      handler: handleShowMoreInformation,
    }
  ];
  const image=createElement('img', ['image'], imageAttributes, null, handlers);
  const cardImage=createElement('div', ['cardImage'], null, null, handlers, [image], 'append');
  return cardImage;
}

function createCardBody(hero){
  const handlers=[
    {
      event: 'click',
      handler: handleShowMoreInformation,
    }
  ];
  const title=createElement('h2', ['title'], null, hero.name);
  const cardBody=createElement('div', ['cardBody'], null, null, handlers, [title], 'append');
  return cardBody;
}

function createModalPicture(hero){
  console.log(hero);
  const pictureAttributes=[
    {
      prop: 'src',
      value: hero.image,
    }
  ];
  return picture=createElement('img',['picture'],pictureAttributes);
}

function createModalName(hero){
  const nameItem=createElement('span', ['name-item'], null, `${hero.name}`);
  return createElement('span', ['word'], null, 'Name: ', null, [nameItem], 'append');
}

function createModalStatus(hero){
  const nameItem=createElement('span', ['status-item'], null, `${hero.status}`);
  return createElement('span', ['word'], null, 'Status: ', null, [nameItem], 'append');
}

function createModalSpecies(hero){
  const nameItem=createElement('span', ['species-item'], null, `${hero.species}`);
  return createElement('span', ['word'], null, 'Species: ', null, [nameItem], 'append');
}

function createModalOrigin(hero){
  const nameItem=createElement('span', ['origin-item'], null, `${hero.origin.name}`);
  return createElement('span', ['word'], null, 'Origin: ', null, [nameItem], 'append');
}

function createModalLocation(hero){
  const nameItem=createElement('span', ['location-item'], null, `${hero.location.name}`);
  return createElement('span', ['word'], null, 'Location: ', null, [nameItem], 'append');
}

function createModalGender(hero){
  const nameItem=createElement('span', ['gender-item'], null, `${hero.gender}`);
  return createElement('span', ['word'], null, 'Gender: ', null, [nameItem], 'append');
}

function closeModalWindow(event){
  document.querySelector('.modal-box').style.display='none';
  document.body.style.overflow = 'visible';
}

function createElement(tag, classList, attributes, textContent, handlers, children, childrenAction){
  const element=document.createElement(tag);

  if (classList?.length){
    element.classList.add(...classList);
  }

  if (attributes?.length){
    attributes.forEach(({prop, value})=>{
      element.setAttribute(prop, value);
    });
  }

  if (textContent){
    element.textContent=textContent;
  }

  if (handlers?.length){
    handlers.forEach(({event, handler})=>{
      element.addEventListener(event,handler);
    });
  }

  if (children){
    element[childrenAction](...children);
  }

  return element;
}