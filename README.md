fork from https://github.com/jamescarr/snipmate-nodejs

添加将snippet转换成可以被vim-snippet使用的格式

output.snippets 是生成的snippet, 可以自己改snippet的key
使用方法:
---
Vundle:
>
	0.先安装neocomplete 和 vim-snippets
	1.将snippet文件放到vim-snippets/snippets/javascript目录下
	2.在.vimrc添加
	```vim
	let g:neosnippet#enable_snipmate_compatibility = 1
	let g:neosnippet#snippets_directory='~/.vim/bundle/vim-snippets/snippets'
	```

	
