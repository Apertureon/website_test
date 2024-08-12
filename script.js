document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    fetch('imagesInfo.json')
        .then(response => response.json())
        .then(data => {
            // 创建所有图片的容器
            const containers = data.map(photo => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'photo-wrapper';
                imgDiv.style.paddingTop = `${(photo.height / photo.width) * 100}%`; // 创建比例盒子以保持图像的宽高比

                const img = document.createElement('img');
                img.src = ''; // 初始不加载图片
                img.alt = "Photo";
                img.style.opacity = 0; // 初始透明度设为0
                img.style.transition = 'opacity 1s ease-in'; // 添加渐显效果
                imgDiv.appendChild(img);
                return imgDiv;
            });

            // 将容器添加到画廊
            containers.forEach(container => gallery.appendChild(container));

            // 初始化 Masonry 布局
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
