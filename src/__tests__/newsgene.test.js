import { should } from 'chai';

// imports locaux
// on importe ce qu'on va tester
import { modifyItem } from '../functions';

should();

// Tests
describe('modifier les données', () => {
  describe('Function', () => {
    it('should be a function', () => {
        modifyItem.should.be.a('function');
    });

    it('should return an array', () => {
        modifyItem().should.be.a('array');
    });
  });

  describe('Process', () => {
    it('should return "1" when param value is 1', () => {
      modifyItem().to.have.ownProperty('sujet');
    });
  });
});
