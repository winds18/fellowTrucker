var home = {
    header:function(d){
        var header = d.header;
        var html = '<header>';
        html += '<div class="top">' + d.title + '</div><i class="iconfont icon-alignjustify"></i>';
        html += '<div class="banner">';
        html += '<h2>' + header.title + '</h2>';
        html += '<nav>';
        for(var i in header.nav){
            html += '<a href="' + header.nav[i].href + '">' + header.nav[i].name + '</a>';
        }
        html += '</nav>';
        html += '<p>' + header.p1 + '</p><p>' + header.p2 + '</p>';
        html += '</div></header>';
        return html;
    },
    table:function(d){
        var html = '<ul class="list">';
        for(var j in d.meta){
            if(d.data[0][12].Comments){
                var cl = 'add';
            }else{
                var cl = '';
            }
            html += '<li class="item-' + j + ' ' + cl + '"><span class="meta">' + d.meta[j] + '</span>';
            html += '<span class="txt">' +d.data[0][j] + '</span>';
        }
        html += '</ul>';
        return html;
    },
    init:function(d){
        document.body.innerHTML = this.header(d) + this.table(d.table);
    }
};

home.init(data);
