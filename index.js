(function (root, factory) {
  /* global define: false, exports: false, require: false */
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['underscore', 'underscore.string'], factory);
  }
  else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('underscore'), require('underscore.string'));
  }
  else {
    // Browser globals (root is window)
    root.fixturer = factory(root._, root._.string);
  }
}(this, function (_, str) {
  'use strict';
  /**
   * Fixture tools
   * @exports {function} fixturer
   */
  _.str = str;

  /**
   * The text used for example string generation
   * @private
   */
  var _loremIpsum = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est.',
    'Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. Fusce eget orci a orci congue vestibulum. Ut dolor diam, elementum et vestibulum eu, porttitor vel elit. Curabitur venenatis pulvinar tellus gravida ornare. Sed et erat faucibus nunc euismod ultricies ut id justo. Nullam cursus suscipit nisi, et ultrices justo sodales nec. Fusce venenatis facilisis lectus ac semper. Aliquam at massa ipsum. Quisque bibendum purus convallis nulla ultrices ultricies. Nullam aliquam, mi eu aliquam tincidunt, purus velit laoreet tortor, viverra pretium nisi quam vitae mi. Fusce vel volutpat elit. Nam sagittis nisi dui.',
    'Suspendisse lectus leo, consectetur in tempor sit amet, placerat quis neque. Etiam luctus porttitor lorem, sed suscipit est rutrum non. Curabitur lobortis nisl a enim congue semper. Aenean commodo ultrices imperdiet. Vestibulum ut justo vel sapien venenatis tincidunt. Phasellus eget dolor sit amet ipsum dapibus condimentum vitae quis lectus. Aliquam ut massa in turpis dapibus convallis. Praesent elit lacus, vestibulum at malesuada et, ornare et est. Ut augue nunc, sodales ut euismod non, adipiscing vitae orci. Mauris ut placerat justo. Mauris in ultricies enim. Quisque nec est eleifend nulla ultrices egestas quis ut quam. Donec sollicitudin lectus a mauris pulvinar id aliquam urna cursus. Cras quis ligula sem, vel elementum mi. Phasellus non ullamcorper urna.',
    'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod ultrices facilisis. Vestibulum porta sapien adipiscing augue congue id pretium lectus molestie. Proin quis dictum nisl. Morbi id quam sapien, sed vestibulum sem. Duis elementum rutrum mauris sed convallis. Proin vestibulum magna mi. Aenean tristique hendrerit magna, ac facilisis nulla hendrerit ut. Sed non tortor sodales quam auctor elementum. Donec hendrerit nunc eget elit pharetra pulvinar. Suspendisse id tempus tortor. Aenean luctus, elit commodo laoreet commodo, justo nisi consequat massa, sed vulputate quam urna quis eros. Donec vel.'
  ].join('\n\n');

  /**
   * Lists of names used for name generation
   * @private
   */
  var _names = {
    first: {
      female: [
        'Sara',
        'Faye',
        'Omega',
        'Tracee',
        'Dominica',
        'Evie',
        'Madge',
        'Faustina',
        'Alline',
        'Minnie',
        'Jeneva',
        'Stacia',
        'Margarett',
        'Ma',
        'Edythe',
        'Kathleen',
        'Shoshana',
        'Kristal',
        'Vicenta',
        'Chan',
        'Yolando',
        'Despina',
        'Janis',
        'Dionna',
        'Lurlene',
        'Nadia',
        'Samella',
        'Olimpia',
        'Manie',
        'Lashonda',
        'Karol',
        'Tamela',
        'Sabine',
        'Olene',
        'Kacie',
        'Lavelle',
        'Keitha',
        'Kathyrn',
        'Florence',
        'Marylynn',
        'Shalanda',
        'Oneida',
        'Anita',
        'Azalee',
        'Eilene',
        'Kassandra',
        'Margo',
        'Thi',
        'Eleonore',
        'Myrtle'
      ],
      male: [
        'Raymond',
        'Don',
        'Refugio',
        'Luis',
        'Karl',
        'Fredrick',
        'Benito',
        'Barton',
        'Shayne',
        'Donny',
        'Clifton',
        'Greg',
        'Lindsay',
        'Kevin',
        'Mikel',
        'Freddy',
        'Marvin',
        'Edmundo',
        'Zachary',
        'Eusebio',
        'Mel',
        'Lenny',
        'Abe',
        'Kenneth',
        'Dale',
        'David',
        'Gene',
        'Mose',
        'Lynn',
        'Sean',
        'Troy',
        'Marion',
        'Lowell',
        'Reed',
        'Antwan',
        'Giuseppe',
        'Carrol',
        'Jay',
        'Cordell',
        'Bryce',
        'Roy',
        'Jamel',
        'Grover',
        'Carmine',
        'Manual',
        'Sylvester',
        'Brendon',
        'Jude',
        'Burt',
        'Renaldo'
      ]
    },
    last: [
      'Lax',
      'Reynoso',
      'Tilly',
      'Klug',
      'Ernst',
      'Vrabel',
      'Banda',
      'Lansberry',
      'Lehmkuhl',
      'Hanning',
      'Oda',
      'Trask',
      'Russom',
      'Angelos',
      'Krawczyk',
      'Dahmen',
      'Keys',
      'Cairo',
      'Bothe',
      'Novak',
      'Austin',
      'Subia',
      'Serino',
      'Backer',
      'Reinert',
      'Wasson',
      'Lou',
      'Lasso',
      'Cape',
      'Cockerham',
      'Rapier',
      'Armijo',
      'Frisch',
      'Jess',
      'Kimbler',
      'Haney',
      'Shumaker',
      'Anstett',
      'Rusher',
      'Voss',
      'Eccles',
      'Linzey',
      'Cane',
      'Claunch',
      'Rouleau',
      'Huneke',
      'Marceau',
      'Leisy',
      'Mondy',
      'Justis'
    ]
  };

  /**
   * Lists of genders used for name generation
   * @private
   */
  var _genders = [
    // I know... this isn't correct...
    'female',
    'male'
  ];

  /**
   * Generates an object of functions to be called from the templates
   * @private
   * @returns {Object.<string, Function>}
   */
  function _functions() {
    var functions = {};
    _.each([
      'loremIpsum',
      'random',
      'randomItem',
      'randomString',
      'randomDate',
      'evilScript',
      'evilLink',
      'personName',
      'thingName'
    ], function(name) {
      functions[name] = fixturer[name];
    });
    return functions;
  }


  /**
   * A fixture generation tools
   * @param {Object.<string, *>} definition - A hash of in which replacements are being made
   * @param {Number} [count]                - The number of fixture objects to be generated
   * @returns {Object|array}                - The fixture(s)
   */
  var fixturer = function(definition, count) {
    count = count || 1;
    if (count > 1) {
      var fixtures = [];
      for (var c = 0; c < count; c++) {
        fixtures.push(fixturer(definition));
      }
      return fixtures;
    }

    var fixture;

    if (_.isString(definition)) {
      fixture = _.template(definition, _functions());
    }
    else if (_.isArray(definition)) {
      fixture = _.map(definition, function(item) {
        return fixturer(item);
      });
    }
    else if (_.isObject(definition)) {
      fixture = {};
      _.each(definition, function(item, name) {
        fixture[name] = fixturer(item);
      });
    }
    else {
      fixture = definition;
    }

    if (_.isString(fixture)) {
      var prefix = /^::(bool|number)::(.*)/.exec(fixture);
      if (prefix) {
        switch (prefix[1]) {
          case 'bool':
            fixture = !!prefix[2];
            if (prefix[2] === '0') {
              fixture = false;
            }
            break;
          case 'number':
            fixture = parseFloat(prefix[2] || 0, 10);
            break;
        }
      }
    }

    return fixture;
  };

  /**
   * Example text generation
   * @returns {string} - A string to be used for fixtures
   */
  fixturer.loremIpsum = function() {
    var words = _loremIpsum.split(/\s/);
    return words.slice(0, fixturer.random(10, words.length - 1)).join(' ');
  };

  /**
   * Generates a random string
   * @param  {integer} length of the generated string
   * @param  {string} chars   allowed to be used
   * @return {string}         a random string
   */
  fixturer.randomString = function(length, chars) {
    chars = chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    };
    return result;
  }

  /**
   * Creates a random number
   * @param {Number} min        - the minimal value return
   * @param {Number} max        - the maximal value return
   * @param {Number} precision  - the floating precision
   * @returns {Number}
   */
  fixturer.random = function(min, max, precision) {
    min = min || 0;
    max = max || 100;
    precision = precision || 0;
    var rand = Math.random();
    // not really elegant...
    var diff = max - min;
    var factor = Math.pow(10, precision);

    return Math.round((min + (diff * rand)) * factor) / factor;
  };

  /**
   * Generates a random date between `start` and `end`
   * @param  {date} [start] for the `oldest` possible value
   * @param  {date} [end]   for the `newest` possible value
   * @return {date}
   */
  fixturer.randomDate = function randomDate(start, end) {
    start = start || (new Date(1981, 1, 9));
    end = end || (new Date(2021, 1, 9));
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  /**
   * Evil code generation
   * @returns {string} - A string with some evil code in it
   */
  fixturer.evilScript = function() {
    return '<script>document.write(\'So screwed!\');</script>';
  };

  /**
   * Evil link generation
   * @returns {string} - A string with some evil link in it
   */
  fixturer.evilLink = function() {
    return '<a href="http://evil.com>evil link</a>';
  };


  /**
   * Generates a random hexadecimal color code
   * @returns {string} - A string like #FFFFFF
   */
  fixturer.randomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  /**
   * Pick one or more random items from an array
   * @param {array} array - the source array
   * @param {number} count - the number of items, 1 by default
   * @returns {*}
   */
  fixturer.randomItem = function(array, count) {
    count = count || 1;
    var items = [];

    for (var c = 0; c < count; c++) {
      items.push(array[[fixturer.random(0, array.length - 1)]]);
    }

    if (count === 1) {
      return items[0];
    }
    return items;
  };

  /**
   * Person name generation
   * @param {bool} first      - if strictly `false`, no first name part
   * @param {bool} last       - if strictly `false`, no last name part
   * @param {bool} middle     - if truthy, adds a middle name part
   * @param {string} gender   - can be 'male', 'female', random if not defined
   * @returns {string}        - A string with some evil code in it
   */
  fixturer.personName = function(first, last, middle, gender) {
    gender = gender || fixturer.randomItem(_genders);
    var name = [];
    if (first !== false) {
      name.push(fixturer.randomItem(_names.first[gender]));
    }
    if (middle) {
      name.push(fixturer.randomItem(_names.first[gender]));
    }
    if (last !== false) {
      name.push(fixturer.randomItem(_names.last));
    }
    return name.join(' ');
  };

  fixturer.thingName = function(count) {
    count = count || 1;
    var name = [];
    var words = _loremIpsum.split(/\s/);
    for (var w = 0; w < count; w++) {
      name.push(fixturer.randomItem(words));
    }
    return name.join(' ');
  };

  return fixturer;
}));
