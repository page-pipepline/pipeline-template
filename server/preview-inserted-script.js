console.info('running preview inserted script');

const receiveMessage = (event) => {
  if (!event.data) return;
  if (!event.data.currentComponent) return;

  const componentId = event.data.currentComponent.id;
  const selector = `div[data-component-id="${componentId}"]`;
  const targetComponent = document.querySelector(selector);
  targetComponent && targetComponent.scrollIntoView();
};

window.addEventListener('message', receiveMessage, false);
