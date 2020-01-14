// == Import : npm
import { connect } from 'react-redux';

// == Import : local
import Body from '../../components/Body';
import { getData, changeInput, modifyData, deleteData } from '../../store/reducer';

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
  deleteData: (id) => {
    const action = deleteData(id);
    dispatch(action);
  },
});

// Container
const BodyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Body);

// == Export
export default BodyContainer;