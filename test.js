var expect = require('expect.js');
var path = require('path');
var definition = {
  name: '<%= "stringy thingy" %>',
  obj: {
    key: 'value'
  },
  random: {
    float: '<%= random(0, 1, 2) %>',
    integer: '<%= random(10, 100) %>',
    negative: '<%= random(-100, -10) %>',
    word: '<%= randomWord() %>'
  },
  names: {
    noargs: '<%= personName() %>',
    female: '<%= personName(true, true, true, "female") %>',
    male: '<%= personName(true, true, true, "male") %>',
    lastname: '<%= personName(false, true) %>'
  },
  loremIpsum: '<%= loremIpsum() %>',
  evil: {
    link: '<%= evilLink() %>',
    script: '<%= evilScript() %>'
  },
  transformation: [
    '::number::1',
    '::number::0.44',
    '::bool::1',
    '::bool::0'
  ]
};

describe('The fixturer module', function(done) {
  var fixturer, json;

  it('loads without blowing', function(done) {
    expect(function() {
      fixturer = require('./index.js');
      done();
    }).not.to.throwError(done);
  });

  it('takes a definition', function(done) {
    json = null;
    try {
      json = fixturer(definition);
      done();
    }
    catch (err) {
      done(err);
    }
  });

  it('makes a fixture', function(done) {
    expect(json).to.be.an('object');
    expect(json.name).to.be.a('string');
    expect(json.obj).to.be.an('object');
    expect(json.obj.key).to.be('value');
    done();
  });

  describe('the set of functions', function() {
    before(function(done) {
      json = fixturer(definition);
      done();
    });

    it('has a "random" utility', function(done) {
      expect((''+ json.random.float).split('.').length).to.be(2);
      expect(json.random.float).to.be.above(0);
      expect(json.random.float).to.be.below(1);

      expect((''+ json.random.integer).split('.').length).to.be(1);
      expect(json.random.integer >= 10).to.be.ok();
      expect(json.random.integer <= 100).to.be.ok();

      expect((''+ json.random.negative).split('.').length).to.be(1);
      expect(json.random.negative >= -100).to.be.ok();
      expect(json.random.negative <= -10).to.be.ok();

      done();
    });

    it('has a "randomWord" utility', function(done) {
      expect(json.random.word).to.be.a('string');
      done();
    });

    it('has a "loremIpsum" utility', function(done) {
      expect(json.loremIpsum).to.be.a('string');
      var firstWords = 'Lorem ipsum';
      expect(json.loremIpsum.slice(0, firstWords.length)).to.be(firstWords);
      done();
    });

    it('has a "personName" utility', function(done) {
      // console.info(json.names);
      expect(json.names).to.be.an('object');
      expect(json.names.noargs).to.be.a('string');
      expect(json.names.female).to.be.a('string');
      expect(json.names.male).to.be.a('string');
      expect(json.names.lastname).to.be.a('string');
      done();
    });

    it('has a "evilScript" utility', function(done) {
      expect(fixturer('<%= evilScript() %>')).to.be.a('string');
      expect(json.evil.script).to.be.a('string');
      done();
    });

    it('has a "evilLink" utility', function(done) {
      expect(fixturer('<%= evilLink() %>')).to.be.a('string');
      expect(json.evil.link).to.be.a('string');
      done();
    });
  });

  describe('the transformation prefix', function() {
    before(function(done) {
      json = fixturer(definition);
      done();
    });

    it('transforms into boolean', function(done) {
      expect(fixturer('::bool::1')).to.be(true);
      expect(fixturer('::bool::0')).to.be(false);
      expect(fixturer('::bool::')).to.be(false);
      expect(fixturer('::bool::<%= 1 %>')).to.be(true);
      expect(json.transformation).to.be.an('array');
      expect(json.transformation[2]).to.be.a('boolean');
      expect(json.transformation[3]).to.be.a('boolean');
      done();
    });

    it('transforms into number', function(done) {
      expect(fixturer('::number::10')).to.be(10);
      expect(fixturer('::number::0')).to.be(0);
      expect(fixturer('::number::')).to.be(0);
      expect(fixturer('::number::<%= 1.67 %>')).to.be(1.67);
      expect(json.transformation).to.be.an('array');
      expect(json.transformation[0]).to.be.a('number');
      expect(json.transformation[1]).to.be.a('number');
      done();
    });
  });
});
