(function(win,doc,$,undefined){
  'use strict';

  var trace = function(){
    for(var i = 0; i < arguments.length; i++){
      console.log(arguments[i]);
    };
  };

  trace('hello world', window.document);

  // don't run if jQuery isn't loaded
  if (typeof window.jQuery === 'undefined') {
    trace('jquery not present');
    return;
  }

  var data, FormData, len, _rand;

  var _rand = function(min, max) {
    return Math.floor(Math.random() * (max- min + 1)) + min;
  };

  /*var fillMake = function(){
    $('select#auto_policy_autos_attributes_0_make').each(function(){
      $(this).on('change',function(){
        setTimeout(function(){
          fillModel()
        },1000)
      });

      data.randomizeSelect(this);
    });
  };*/

  /*var fillModel = function(){
    $('select#auto_policy_autos_attributes_0_vehicle_model').each(function(){
      data.randomizeSelect(this);
    });
  };*/

  var fillForm = function() {
    data = new FormData(win.faker);
    $('#auto_policy_drivers_attributes_0_first_name').val(data.firstName);
    $('#auto_policy_drivers_attributes_0_last_name').val(data.lastName);
    $('#auto_policy_street_address').val(data.address1);
    $('#city').val(data.city);
    $('#state').val(data.state);
    $('#auto_policy_drivers_attributes_0_zip_code').val(data.zip);
    $('#pw').val(data.password);
    $('#pw-repeat').val(data.password);
    $('#auto_policy_phone').val(data.phone);

    data.randomizeRadio($('[name="radio-choice"]'));

    /*$('select#auto_policy_autos_attributes_0_year').each(function(){
      $(this).on('change',function(){
        setTimeout(function(){
          fillMake()
        },1000)
      });

      data.randomizeSelect(this);
    });*/

    // Randomize all select boxes
    $('select:not(#auto_policy_autos_attributes_0_year):not(#auto_policy_autos_attributes_0_vehicle_model):not(#auto_policy_autos_attributes_0_vehicle_model)').each(function() {
      data.randomizeSelect(this);
    });

    // Randomize all checkboxes
    $('input[type="checkbox"]').each(function() {
      data.randomizeCheckbox(this);
    });

    // Randomize all textareas
    $('textarea').each(function() {
      data.randomizeParagraph(this);
    });

    // Randomize all emails
    $('input[type="text"]#auto_policy_email').each(function() {
      data.randomizeEmail(this);
    });

    console.log($('.field_with_errors'));
    // $('#new_auto_policy').submit();
  };

  var FormData = function(faker){
    this.faker = faker;
    this.randomWord = faker.internet.domainWord();
    this.username = 'fake_' + this.randomWord;
    this.username += _rand(100,9999);
    this.password = 'pass1234';
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.address1 = faker.address.streetAddress();
    this.city = faker.address.city();
    this.state = faker.address.stateAbbr();
    this.zip = '02138';
    this.phone = '6173889520';
  };

  FormData.prototype.randomizeSelect = function(el){
    var $el = $(el);
    len  = $el.find('option').length - 1;
    $el.children('option').prop('selected', false).eq( _rand( 1,len + 1 ) ).prop('selected', true);
  };

  FormData.prototype.randomizeRadio = function(radios) {
    radios = radios.not('[type="hidden"]');
    len    = radios.length;
    radios.prop('checked', false).eq( _rand( 0, len - 1 ) ).prop('checked', true);
  };

  FormData.prototype.randomizeParagraph = function(el) {
    $(el).val(this.faker.Lorem.sentence(5));
  };

  FormData.prototype.randomizeCheckbox = function(el) {
    var $el  = $(el);
    $el.prop('checked', false);
    if (_rand( 0,1 ) === 0) $el.prop('checked', true);
  };

  FormData.prototype.randomizeEmail = function(el) {
    $(el).val(this.randomWord + '@gmail.com');
  };

  $.getScript('http://10.211.55.2:8080/node_modules/faker/build/build/faker.js')
  .done(function(){
    trace('got the script!!!');
    fillForm();
  })
  .fail(function(){
    win.console.error('ERROR: FakerJS not loaded');
  });

}(window, window.document,window.jQuery));

