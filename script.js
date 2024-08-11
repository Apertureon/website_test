// script.js
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.photo-gallery');
    fetch('imagesInfo.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(photo => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'photo-wrapper';
                imgDiv.style.paddingTop = `${(photo.height / photo.width) * 100}%`;  // 创建占位比例盒子

                const img = document.createElement('img');
                img.dataset.src = photo.thumbnailPath;  // 实际缩略图路径
                img.alt = "Photo by Camarts";
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.opacity = '0';  // 初始透明
                img.onload = function() {
                    // 当图片加载后，显示图片并去除透明度
                    this.style.opacity = '1';
                };

                imgDiv.appendChild(img);
                gallery.appendChild(imgDiv);
            });

            // 使用imagesLoaded库确保所有图片占位符加载完毕再初始化Masonry
            imagesLoaded(gallery, () => {
                new Masonry(gallery, {
                    itemSelector: '.photo-wrapper',
                    percentPosition: true
                });
            });
        });
});
