import Dealer from "../home/dealer";

export const handleNextPage = (currentPage, setCurrentPage, totalPages) => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
};

export const handlePreviousPage = (currentPage, setCurrentPage, totalPages) => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};
export const handleSearchChange = (setSearch, setCurrentPage) => {
    setSearch()
    setCurrentPage();
};
export const handleStartdate = (setStartdate, setCurrentPage) => {
    setStartdate();
    setCurrentPage();
};

export const handleEnddate = (setEnddate, setCurrentPage) => {
    setEnddate();
    setCurrentPage();
};
export const handleOpen = (setShowpopup,setEdit,dealer) => {
    setEdit(dealer);
    setShowpopup();
}
export const handleCLose = (setShowpopup,setEdit) => {
    setShowpopup();
    setEdit();
}