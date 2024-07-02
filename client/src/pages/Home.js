import React, { useState } from "react";

const dummyData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Member ${index + 1}`,
    email: `member${index + 1}@example.com`,
    age: 20 + (index % 30),
}));

const ITEMS_PER_PAGE = 5;

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);
    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [memberAge, setMemberAge] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const handleSaveChanges = () => {
        const newMember = {
            id: dummyData.length + 1,
            name: memberName,
            email: memberEmail,
            age: parseInt(memberAge, 10),
        };
        dummyData.push(newMember);
        setCurrentPage(Math.ceil(dummyData.length / ITEMS_PER_PAGE));
        setMemberName('');
        setMemberEmail('');
        setMemberAge('');
    };

    const handleEditMember = (member) => {
        setSelectedMember(member);
    };

    const handleConfirmEdit = () => {
        setSelectedMember(null);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = dummyData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                    <input type="text" className="form-control mr-sm-2" placeholder="Search" id="searchInput" style={{ width: '70%' }} />
                    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#addMemberModal">Add</button>
                </div>
            </div>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Member Name</th>
                        <th>Member Email</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {currentData.map((member) => (
                        <tr key={member.id}>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.age}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary"
                                    data-toggle="modal"
                                    data-target="#editMemberModal"
                                    onClick={() => handleEditMember(member)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary" onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
                <button className="btn btn-secondary mx-2" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span className="align-self-center mx-2">Page {currentPage} of {totalPages}</span>
                <button className="btn btn-secondary mx-2" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                <button className="btn btn-secondary" onClick={handleLastPage} disabled={currentPage === totalPages}>Last</button>
            </div>

            <div className="modal fade" id="addMemberModal" tabIndex="-1" role="dialog" aria-labelledby="addMemberModalTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addMemberModalTitle">Add Member</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="memberName">Member Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="memberName"
                                    value={memberName}
                                    onChange={(e) => setMemberName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="memberEmail">Member Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="memberEmail"
                                    value={memberEmail}
                                    onChange={(e) => setMemberEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="memberAge">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="memberAge"
                                    value={memberAge}
                                    onChange={(e) => setMemberAge(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges} data-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editMemberModal" tabIndex="-1" role="dialog" aria-labelledby="editMemberModalTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editMemberModalTitle">Are you sure?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to edit {selectedMember?.name}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleConfirmEdit} data-dismiss="modal">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
