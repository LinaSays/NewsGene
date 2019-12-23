// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import App from '../App';
import { getData, changeInput, modifyData } from '../store/reducer';

const mapStateToProps = (state) => ({
    information: state.information,
    endpoint: state.endpoint,
});

const mapDispatchToProps = (dispatch) => ({
    getData: () => {
    const action = getData();
    dispatch(action);
  },
  changeValue: (name, value) => {
    const action = changeInput(name, value);
    dispatch(action);
  },
  modifyData: (id) => {
    const action = modifyData(id);
    dispatch(action);
  },
});

// Container
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

// == Export
export default AppContainer;