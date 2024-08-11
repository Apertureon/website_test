document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.photo-gallery');
    fetch('imagesInfo.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(photo => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'photo-wrapper';
                imgDiv.style.paddingTop = `${(photo.height / photo.width) * 100}%`; // 创建比例盒子

                const img = document.createElement('img');
                img.src = photo.thumbnailPath; // 确保这里是thumbnail路径
                img.alt = "Photo by Camarts";
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.opacity = '0'; // 初始透明

                img.onload = function() {
                    this.style.opacity = '1'; // 图片加载完成后显示
                };

                imgDiv.appendChild(img);
                gallery.appendChild(imgDiv);
            });

            imagesLoaded(gallery, () => {
                new Masonry(gallery, {
                    itemSelector: '.photo-wrapper',
                    percentPosition: true
                });
            });
        });
});
