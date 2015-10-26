'use strict';
/*
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://10.211.55.2:8080/prefill-ie.js';
document.getElementsByTagName('body')[0].appendChild(script);
*/

(function(win,doc,$){

  // don't run if jQuery isn't loaded
  if (typeof $ === 'undefined') return;

  // declare our variables
  var data, FormData, len, _rand, path;

  // find the path we're on
  path = win.location.pathname;

  // for randomizing the form fields/selections/checkboxes/radio buttons
  var _rand = function(min, max) { return Math.floor(Math.random() * (max- min + 1)) + min; };

  // selects the vehicle make
  var fillMake = function(){
    var select = doc.getElementById('auto_policy_autos_attributes_0_make');
    $(select).on('change', function(){
      setTimeout(function(){
        console.log('fillModel is being called');
        fillModel();
      }, 1000)
    });
    data.randomizeSelect(select);

    // $('select#auto_policy_autos_attributes_0_make').each(function(){
    //   $(this).on('change',function(){
    //     setTimeout(function(){
    //       fillModel()
    //     },1000)
    //   });
    // });
  };

  // selects the vehicle model
  var fillModel = function(){
    var select = doc.getElementById('auto_policy_autos_attributes_0_vehicle_model');
    data.randomizeSelect(select);
  };

  var fillOutLanding = function(){
    data = new FormData(win.faker);
    if($(doc.body).hasClass('eq-style')){
      $('#landing-zip-code').val(data.zip).trigger('keyup');
      $('#reason-for-quote').find('option').last().prop('selected', true);
      $('#zip-landing').submit();
    } else {
      // you're on a different landing than everquote
    }
  };

  var fillOutAutoPolicy = function(){
    var is_everquote = $(doc.body).hasClass('eq-style');
    data = new FormData(win.faker);


    data.randomizeSelect(doc.getElementById('auto_policy_autos_attributes_0_year'));
    setTimeout(function(){
      fillMake()
    }, 1000);

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
    $('#auto_policy_email').each(function() {
      data.randomizeEmail(this);
    });

    data.randomizeRadio($('[name="radio-choice"]'));
    $('#auto_policy_drivers_attributes_0_first_name').val(data.firstName);
    $('#auto_policy_drivers_attributes_0_last_name').val(data.lastName);
    $('#auto_policy_street_address').val(data.address1);
    $('#city').val(data.city);
    $('#state').val(data.state);
    $('#auto_policy_drivers_attributes_0_zip_code').val(data.zip);
    $('#pw').val(data.password);
    $('#pw-repeat').val(data.password);
    $('#auto_policy_phone').val(data.phone);
    $('#auto_policy_zip_code').val(data.zip);

    if(is_everquote){
      $('#auto_policy__x_driver_count').find('option[value=1]').prop('selected',true);
      $('#auto_policy__x_vehicle_count').find('option[value=1]').prop('selected',true);
      $('label[for=auto_policy_drivers_attributes_0_gender_Female]').trigger('click');
      $('label[for=auto_policy_drivers_attributes_0_marital_status_Married]').trigger('click');

      // submit the form with this line:
      // $('#submit-button').trigger('click');
    }
  };

  var routeForm = function(pathname) {
    switch(pathname){
      case '/landings':
        fillOutLanding();
        break;
      case '/auto_policies':
        fillOutAutoPolicy();
        break;
      default:
        break;
    }
  };

  var FormData = function(faker){
    this.faker = faker;
    this.randomWord = faker.internet.domainWord();
    this.username = 'fake_' + this.randomWord;
    this.username += _rand(100,9999);
    this.password = faker.internet.password();
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.address1 = faker.address.streetAddress();
    this.city = faker.address.city();
    this.state = faker.address.stateAbbr();
    this.zip = '90210'// doesn't work so great for our purposes: faker.address.zipCode();
    this.phone = '6175519290';
  };

  FormData.prototype.randomizeSelect = function(el){
    var $el = $(el);
    len  = $el.find('option').length - 1;
    $el.children('option').prop('selected', false).eq( _rand( 1,len + 1 ) ).prop('selected', true);
    $el.trigger('change');
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

  $.getScript('http://localhost:8080/node_modules/faker/build/build/faker.js')
    .done(function(){
      routeForm(path);
    })
    .fail(function(){
      win.console.error('ERROR: FakerJS not loaded');
    });

}(window, window.document,window.jQuery));

