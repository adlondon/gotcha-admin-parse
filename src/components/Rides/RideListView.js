import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { X } from 'react-feather';

import { Button, ModalCard, LoaderOrThis } from '../common';
import { getRides, deleteRide, addRide, selectRide, editRide } from './RideActions';
import { getAreas } from '../Areas/AreaActions';
import AddRideModal from './AddRideModal';
import DeleteRideModal from './DeleteRideModal';
import EditRideModal from './EditRideModal';

class RideListView extends Component {
  constructor(props) {
    super(props);
    this.state = { showAddModal: false, showDeleteModal: false, showEditModal: false };
    this.props.getRides(props.rideList.length === 0);
    this.props.getAreas();
    this.handleRowPress = this.handleRowPress.bind(this);
    this.handleAddRide = this.handleAddRide.bind(this);
    this.handleEditRide = this.handleEditRide.bind(this);
    this.handleDeleteRide = this.handleDeleteRide.bind(this);
    this.closeModals = this.closeModals.bind(this);
  }

  closeModals() {
    this.setState({ showAddModal: false, showDeleteModal: false, showEditModal: false });
  }

  handleAddRide(rideObj) {
    this.setState({ showAddModal: false });
    if (rideObj) this.props.addRide(rideObj);
  }

  handleEditRide(rideObj) {
    this.setState({ showEditModal: false });
    if (rideObj) this.props.editRide(rideObj);
  }

  handleDeleteRide(rideId) {
    this.setState({ showDeleteModal: false });
    if (rideId) this.props.deleteRide(rideId);
  }

  handleRowPress(rowInfo, column) {
    this.props.selectRide(rowInfo);
    if (column.Header === '') {
      this.setState({ selectedRide: rowInfo.original, showDeleteModal: true });
    } else {
      this.setState({ selectedRide: rowInfo.original, showEditModal: true });
    }
  }

  render() {
    const columns = [
      { Header: 'Name', accessor: 'attributes.name' },
      {
        Header: 'Branding',
        accessor: 'attributes.image._url',
        Cell: row => (<div style={{
          height: '50px',
          width: '65px',
          backgroundImage: `url(${row.value})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          margin: 'auto'
        }} />),
      },
      {
        Header: 'Color',
        accessor: 'attributes.color',
        Cell: row => (<div style={{
          height: '30px',
          width: '30px',
          borderRadius: '30px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'black',
          backgroundColor: row.value,
          margin: 'auto'
        }} />),
      },
      { Header: 'Area', accessor: 'attributes.serviceArea.attributes.name' },
      {
        Header: '',
        accessor: 'id',
        Cell: () => <X style={{ cursor: 'pointer' }} color="red" size={30} />,
        width: 40
      }
    ];

    return (
      <LoaderOrThis loading={this.props.loading}>
        <div>
          <ReactTable
            getTdProps={(tableState, rowInfo, column) => ({ onClick: () => { this.handleRowPress(rowInfo, column); } })}
            className="-striped -highlight mb4"
            data={this.props.rideList}
            pageSize={10}
            showPageSizeOptions={false}
            columns={columns} />
          <div className="flex justify-between items-center">
            <Button onClick={() => this.setState({ showAddModal: true })}>+ Add Ride</Button>
            {this.props.error && <div className="red">{this.props.error}</div>}
          </div>
          {this.state.showAddModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <AddRideModal options={this.props.areaList} onClick={d => this.handleAddRide(d)} />
            </ModalCard>
          }
          {this.state.showDeleteModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <DeleteRideModal onClick={d => this.handleDeleteRide(d)} ride={this.state.selectedRide} />
            </ModalCard>
          }
          {this.state.showEditModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <EditRideModal options={this.props.areaList} onClick={d => this.handleEditRide(d)} ride={this.state.selectedRide} />
            </ModalCard>
          }
        </div>
      </LoaderOrThis>
    );
  }
}


const mapStateToProps = ({ RideReducer, AreaReducer }) => {
  const {
    rideList,
    loading,
    error,
    selectedRide
  } = RideReducer;
  const { areaList } = AreaReducer;
  return {
    rideList,
    loading,
    error,
    areaList,
    selectedRide
  };
};


export default connect(mapStateToProps, {
  getRides,
  deleteRide,
  addRide,
  getAreas,
  selectRide,
  editRide
})(RideListView);
