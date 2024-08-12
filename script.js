document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    fetch('imagesInfo.json')
        .then(response => response.json())
        .then(data => {
            // 创建所有图片的容器
            const containers = data.map(photo => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'photo-wrapper';
                imgDiv.style.width = '100%'; // 宽度由 Masonry 控制，通常为列宽的一部分

                // 创建一个透明的占位元素以保持宽高比
                const spacer = document.createElement('div');
                spacer.style.paddingTop = `${(photo.height / photo.width) * 100}%`;
                imgDiv.appendChild(spacer);

                // 准备图片元素，但不设置源
                const img = document.createElement('img');
                img.alt = "Photo";
                img.style.position = 'absolute';
                img.style.top = 0;
                img.style.left = 0;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.opacity = 0; // 初始透明度设为0
                img.style.transition = 'opacity 1s ease-in'; // 添加渐显效果
                imgDiv.appendChild(img);

                return imgDiv;
            });

            // 将容器添加到画廊并初始化 Masonry 布局
            containers.forEach(container => gallery.appendChild(container));
            new Masonry(gallery, {
                itemSelector: '.photo-wrapper',
                columnWidth: '.grid-sizer',
                percentPosition: true
            });

            // 布局初始化完成后设置图片并开始加载
            data.forEach((photo, index) => {
                const img = containers[index].querySelector('img');
                img.src = photo.thumbnailPath; // 设置thumbnail图片路径
                img.onload = () => img.style.opacity = 1; // 图片加载完成后逐渐显示
            });
        });
});
