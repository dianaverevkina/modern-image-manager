/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/ImagesContainer.js
class ImagesContainer {
  constructor(container) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    }
    this.deleteImg = this.deleteImg.bind(this);
    this.container.addEventListener('click', this.deleteImg);
  }

  // Удаляем изображение
  deleteImg(e) {
    const {
      target
    } = e;
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
;// CONCATENATED MODULE: ./src/js/ImageWidget.js

class ImageWidget {
  constructor(container) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    }
    this.fileContainer = this.container.querySelector('.file-container');
    this.containerContent = this.fileContainer.querySelector('.file-container__content');
    this.btnAddFile = this.fileContainer.querySelector('.btn-add');
    this.input = this.fileContainer.querySelector('.file-container__input');
    this.imagesContainer = new ImagesContainer('.images__container');
    this.addEvents();
  }

  // Добавляем обработчики событий
  addEvents() {
    this.fileContainer.addEventListener('dragover', e => {
      e.preventDefault();
      this.containerContent.classList.add('file-container__content_hovered');
    });
    this.fileContainer.addEventListener('dragleave', () => {
      this.containerContent.classList.remove('file-container__content_hovered');
    });
    this.fileContainer.addEventListener('drop', e => {
      e.preventDefault();
      this.containerContent.classList.remove('file-container__content_hovered');
      const {
        files
      } = e.dataTransfer;
      this.loadImages(files);
    });
    this.btnAddFile.addEventListener('click', e => {
      e.preventDefault();
      this.input.value = '';
      this.input.dispatchEvent(new MouseEvent('click'));
    });
    this.input.addEventListener('change', () => {
      const {
        files
      } = this.input;
      if (files.length === 0) return;
      this.loadImages(files);
    });
  }

  // Загружаем изображения
  loadImages(files) {
    [...files].forEach(file => {
      const link = URL.createObjectURL(file);
      this.imagesContainer.addImage(link, file.name);
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const widget = new ImageWidget('.widget');
console.log(widget);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map