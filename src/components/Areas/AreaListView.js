import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import { X } from 'react-feather';

import { Button, ModalCard, LoaderOrThis } from '../common';
import { getAreas, deleteArea, addArea, selectArea, editArea } from './AreaActions';
import AddAreaModal from './AddAreaModal';
import DeleteAreaModal from './DeleteAreaModal';
import EditAreaModal from './EditAreaModal';

class AreaListView extends Component {
  constructor(props) {
    super(props);
    this.state = { showAddModal: false, showDeleteModal: false, showEditModal: false };
    this.props.getAreas(props.areaList.length === 0);
    this.handleRowPress = this.handleRowPress.bind(this);
    this.handleAddArea = this.handleAddArea.bind(this);
    this.handleDeleteArea = this.handleDeleteArea.bind(this);
    this.closeModals = this.closeModals.bind(this);
  }

  closeModals() {
    this.setState({ showAddModal: false, showDeleteModal: false, showEditModal: false });
  }

  handleAddArea(areaObj) {
    this.setState({ showAddModal: false, showDeleteModal: false, showEditModal: false });
    if (areaObj) this.props.addArea(areaObj);
  }

  handleDeleteArea(areaId) {
    this.setState({ showAddModal: false, showDeleteModal: false, showEditModal: false });
    if (areaId) this.props.deleteArea(areaId);
  }

  handleEditArea(areaObj) {
    this.setState({ showAddModal: false, showDeleteModal: false, showEditModal: false });
    if (areaObj) this.props.editArea(areaObj);
  }

  handleRowPress(rowInfo, column) {
    this.props.selectArea(rowInfo);
    if (column.Header === '') {
      this.setState({ selectedArea: rowInfo.original, showDeleteModal: true });
    } else {
      this.setState({ selectedArea: rowInfo.original, showEditModal: true });
    }
  }


  render() {
    const columns = [
      { Header: 'Name', accessor: 'attributes.name' },
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
            data={this.props.areaList}
            pageSize={10}
            showPageSizeOptions={false}
            columns={columns} />
          <div className="flex justify-between items-center">
            <Button onClick={() => this.setState({ showAddModal: true })}>+ Add Area</Button>
            {this.props.error && <div className="red">{this.props.error}</div>}
          </div>
          {this.state.showAddModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <AddAreaModal onClick={d => this.handleAddArea(d)} />
            </ModalCard>
          }
          {this.state.showDeleteModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <DeleteAreaModal onClick={d => this.handleDeleteArea(d)} area={this.state.selectedArea} />
            </ModalCard>
          }
          {this.state.showEditModal &&
            <ModalCard noHeaderBorder onClick={() => this.closeModals()}>
              <EditAreaModal onClick={d => this.handleEditArea(d)} area={this.state.selectedArea} />
            </ModalCard>
          }
        </div>
      </LoaderOrThis>
    );
  }
}


const mapStateToProps = ({ AreaReducer }) => {
  const { areaList, loading, error } = AreaReducer;
  return {
    areaList,
    loading,
    error
  };
};


export default connect(mapStateToProps, {
  getAreas,
  deleteArea,
  addArea,
  selectArea,
  editArea
})(AreaListView);
