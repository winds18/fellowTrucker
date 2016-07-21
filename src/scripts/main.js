var home = {
    header:function(d){
        var header = d.header;
        var html = '<header>';
        html += '<div class="top">' + d.title + '</div><i class="iconfont icon-alignjustify"></i>';
        html += '<ul class="subnav"><li class="arrow-up"></li>';
        for(var i in header.subnav){
            html += '<li><a href="' + header.subnav[i].href + '">' + header.subnav[i].name + '</a></li>';
            if(i == 0){
                html += '<li class="line"><div></div></li>';
            }
        }
        html += '</ul>';
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
        var item = function(p,data){
            var obj = {};
            obj.html = '<span class="txt">' + data.item[p] + '</span>';
            if(data.Comments){
                obj.pro = 'add';
                obj.comment = data.Comments;
            }else{
                obj.pro = '';
            }
            return obj;
        };
        for(var i in d.meta){
            var obj = item(i,d.data[0]);
            html += '<li class="item-' + i + ' ' + obj.pro + '"><span class="meta">' + d.meta[i] + '</span>';
            html += obj.html;
            if(obj.pro && i == 1){
                html += '<div class="comments">Comments:' + obj.comment + '</div>';
            }
            html += '</li>';
        }
        html += '</ul>';
        return html;
    },
    subnav:function($){
        $('i.icon-alignjustify').on('click',function(e){
            (function(obj){
                if(typeof(obj.attr('style')) === 'undefined'){
                    obj.css('display','block');
                }else{
                    obj.removeAttr('style');
                }
            })($('.subnav'));
        });
    },
    comments:function($){
        $('.item-1').on('click',function(){
            if($(this)[0].className.indexOf('add') > 0){
                $(this).removeClass('add').addClass('sub');
                $('.comments').css('display','block');
                $(this).css('background-position','95% 20%');
            }else if($(this)[0].className.indexOf('sub') > 0){
                $(this).removeClass('sub').addClass('add');
                $('.comments').css('display','none');
                $(this).removeAttr('style');
            }
        });
    },
    dropdown:function($){
        var html = '<dl>';
        var that = this;
        data.table.data.map(function(item,index){
            html += '<dt data-id="' + index + '">' + item.item[0] + '</dt>';
        });
        html += '</dl>';
        $('.item-0').append(html).on('click',function(){
            if($(this).children('dl').attr('style')){
                $(this).children('dl').removeAttr('style');
            }else{
                $(this).children('dl').css('display','block');
            }
        }).find('dt').on('click',function(){
            that.update($,$(this).attr('data-id'),data.table.data);
        });
    },
    update:function($,index,data){
        if(data[index].Comments){
            $('.comments').html("Comments:" + data[index].Comments);
            $('.item-1').addClass('add');
        }else{
            $('.item-1').removeClass('add');
        }
        [].slice.call($('span.txt')).map(function(item,j){
            item.innerHTML = data[index].item[j];
        });;
    },
    init:function(d){
        document.body.innerHTML = this.header(d) + this.table(d.table);
        this.subnav(jQuery);
        this.comments(jQuery);
        this.dropdown(jQuery);
    }
};

home.init(data);
