import ImagesContainer from './ImagesContainer';

export default class ImageWidget {
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
    this.fileContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.containerContent.classList.add('file-container__content_hovered');
    });

    this.fileContainer.addEventListener('dragleave', () => {
      this.containerContent.classList.remove('file-container__content_hovered');
    });

    this.fileContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      this.containerContent.classList.remove('file-container__content_hovered');
      const { files } = e.dataTransfer;
      this.loadImages(files);
    });

    this.btnAddFile.addEventListener('click', (e) => {
      e.preventDefault();

      this.input.value = '';
      this.input.dispatchEvent(new MouseEvent('click'));
    });

    this.input.addEventListener('change', () => {
      const { files } = this.input;
      if (files.length === 0) return;
      this.loadImages(files);
    });
  }

  // Загружаем изображения
  loadImages(files) {
    [...files].forEach((file) => {
      const link = URL.createObjectURL(file);
      this.imagesContainer.addImage(link, file.name);
    });
  }
}
