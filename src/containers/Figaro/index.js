// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Figaro from '../../components/Figaro';
import { getFigaro } from '../../store/reducer';

const mapStateToProps = (state) => ({
    information: state.information,
});

const mapDispatchToProps = (dispatch) => ({
    getFigaro: () => {
    const action = getFigaro();
    dispatch(action);
  },
});

// Container
const FigaroContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Figaro);

// == Export
export default FigaroContainer;