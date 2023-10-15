export default class ImagesContainer {
  constructor(container) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    }

    this.deleteImg = this.deleteImg.bind(this);

    this.container.addEventListener('click', this.deleteImg);
  }

  // Удаляем изображение
  deleteImg(e) {
    const { target } = e;
    const imgDelete = target.closest('.item__delete');

    if (!imgDelete) return;

    const imgEl = imgDelete.closest('.item');
    imgEl.remove();
  }

  // Создаем элемент картинки
  renderImgElement(link, name) {
    const imgEl = document.createElement('div');
    imgEl.classList.add('images__item', 'item');
    imgEl.innerHTML = `
      <div class="item__img">
        <img src=${link} alt=${name} class="item__img-picture">
      </div>
      <div class="item__delete">
        <img src="./images/cross.jpg" alt="cross-icon" class="item__cross">
      </div>
    `;

    return imgEl;
  }

  // Добавляем картинку
  addImage(link, name) {
    const imgElement = this.renderImgElement(link, name);
    const img = imgElement.querySelector('.item__img-picture');

    img.addEventListener('load', () => {
      this.container.append(imgElement);
    });
    img.addEventListener('error', this.showError);
  }

  showError() {
    alert('Не удалось загрузить изображение');
  }
}
