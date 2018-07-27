import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { X } from 'react-feather';

import { Button, ModalCard, LoaderOrThis } from '../common';
import { getDrivers, deleteDriver, addDriver } from './DriverActions';
import { getAreas } from '../Areas/AreaActions';
import AddDriverModal from './AddDriverModal';
import DeleteDriverModal from './DeleteDriverModal';

class DriverListView extends Component {
  constructor(props) {
    super(props);
    this.state = { showAddModal: false, showDeleteModal: false };
    this.props.getDrivers(props.driverList.length === 0);
    this.props.getAreas();
    this.handleAddDriver = this.handleAddDriver.bind(this);
    this.handleDeleteDriver = this.handleDeleteDriver.bind(this);
    this.closeModals = this.closeModals.bind(this);
  }

  closeModals() {
    this.setState({ showAddModal: false, showDeleteModal: false });
  }

  handleAddDriver(driverObj) {
    this.setState({ showAddModal: false, showDeleteModal: false });
    if (driverObj) this.props.addDriver(driverObj);
  }

  handleDeleteDriver(driverId) {
    this.setState({ showAddModal: false, showDeleteModal: false });
    if (driverId) this.props.deleteDriver(driverId);
  }

  render() {
    const columns = [
      { Header: 'Name', accessor: 'attributes.name' },
      { Header: 'Area', accessor: 'attributes.serviceArea.attributes.name' },
      { Header: 'Email', accessor: 'attributes.user.attributes.username' },
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
            getTdProps={(tableState, rowInfo, column) => ({ onClick: () => { if (column.Header === '') this.setState({ selectedDriver: rowInfo.original, showDeleteModal: true }); } })}
            className="-striped -highlight mb4"
            data={this.props.driverList}
            pageSize={10}
            showPageSizeOptions={false}
            columns={columns} />
          <div className="flex justify-between items-center">
            <Button onClick={() => this.setState({ showAddModal: true })}>+ Add Driver</Button>
            {this.props.error && <div className="red">{this.props.error}</div>}
          </div>
          {this.state.showAddModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <AddDriverModal options={this.props.areaList} onClick={d => this.handleAddDriver(d)} />
            </ModalCard>
          }
          {this.state.showDeleteModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <DeleteDriverModal onClick={d => this.handleDeleteDriver(d)} driver={this.state.selectedDriver} />
            </ModalCard>
          }
        </div>
      </LoaderOrThis>
    );
  }
}


const mapStateToProps = ({ DriverReducer, AreaReducer }) => {
  const { driverList, loading, error } = DriverReducer;
  const { areaList } = AreaReducer;
  return {
    driverList,
    areaList,
    loading,
    error
  };
};


export default connect(mapStateToProps, {
  getDrivers, deleteDriver, addDriver, getAreas
})(DriverListView);
