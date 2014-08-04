;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "revealPicker",
        defaults = {
            slideList:null,
            pickerCallback: null
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {

            console.log(this.element);
            console.log(this.options);
            
            this.buildSelect(this.element,this.options);


        },

        buildSelect: function(el, options) {
            // some logic
            console.log(arguments);

            $("body").prepend('<div id="picker-modal"><div class="picker-cont"><select id="picker" style="width:80%"><option></option></select></div></div>');


            $.getJSON(options.slideList, function(data){

                $.each(data.presentations, function(i, item){
                    console.log(item.name, item.slides);

                    $("#picker").append('<option value="'+item.slides+'">'+item.name+'</option>');
                })
            })

            $("#picker").select2({
                placeholder: "Select a Presentation"
            });

            $("#picker").on('change',function(){                

                var thisPreso = $(this).val();

                $(el).attr('data-markdown', thisPreso);
                
                $("#picker-modal").fadeOut("fast",function(){
                    options.pickerCallback();    
                });

                
            })  
        }
    };
    
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );