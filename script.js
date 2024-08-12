document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    fetch('imagesInfo.json')
        .then(response => response.json())
        .then(data => {
            // 创建所有图片的容器
            data.forEach(photo => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'photo-wrapper';
                imgDiv.style.paddingTop = `${(photo.height / photo.width) * 100}%`; // 创建比例盒子以保持图像的宽高比
                
                gallery.appendChild(imgDiv);
            });

            // 初始化 Masonry 布局
            const masonry = new Masonry(gallery, {
                itemSelector: '.photo-wrapper',
                columnWidth: '.grid-sizer', 
                percentPosition: true
            });

            // 布局初始化完成后设置图片背景
            data.forEach((photo, index) => {
                const imgDiv = gallery.children[index];
                imgDiv.style.backgroundImage = `url('${photo.thumbnailPath}')`; // 设置thumbnail图片为背景
                imgDiv.style.backgroundSize = 'cover';
                imgDiv.style.backgroundPosition = 'center center';
            });
        });
});
