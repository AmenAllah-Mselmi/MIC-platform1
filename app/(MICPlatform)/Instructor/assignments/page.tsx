"use client";
import * as React from "react";
import {
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import EnhancedTable from "../../_MICcomponents/Admin_UI/TableComponent/TableComponent";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import PaginationComponent from "../../_MICcomponents/PaginationComponent/PaginationComponent";
import { useAssignmentStore } from "@/app/store/MyStore/AssignmentsStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentCard from "../../_MICcomponents/assignment_UI/AssignmentCardForInstructor";
import { Assignment } from "@/app/store/Models/Assignment";
import UpdateAssignmentModal from "../../_MICcomponents/assignment_UI/AssignementUpdateModal";
import DeleteAssignmentModal from "../../_MICcomponents/assignment_UI/AssignementDeleteModal";
import AssignmentModal from "../../_MICcomponents/assignment_UI/AssignmentModal";
import { useRouter } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Page: React.FC = () => {
  const router = useRouter();
  const assignments = useAssignmentStore((state) => state.assignments);
  const fetchAssignments = useAssignmentStore((state) => state.fetchAssignments);
  const deleteAssignment = useAssignmentStore((state) => state.deleteAssignment);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);
  const [openAssignmentModal, setOpenAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  const HandleNavigate = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    localStorage.setItem('selectedAssignmentId', id);
    router.push('/Instructor/responses');
  };

  useEffect(() => {
    const loadAssignments = async () => {
      await fetchAssignments("670792e3ee0e13424434d371");
    };
    loadAssignments();
  }, [fetchAssignments]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = assignments ? assignments.slice(indexOfFirstItem, indexOfLastItem) : [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleEditAssignment = (id: string | number) => {
    const assignment = assignments?.find((assignment) => assignment?._id === id);
    if (assignment) {
      setEditingAssignment(assignment);
      setOpenUpdateDialog(true);
    }
  };

  const handleCloseUpdateDialog = () => {
    setEditingAssignment(null);
    setOpenUpdateDialog(false);
  };

  const handleDeleteAssignment = (id: string) => {
    const assignment = assignments?.find((assignment) => assignment?._id === id);
    if (assignment) {
      setAssignmentToDelete(id);
      setOpenDeleteDialog(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setAssignmentToDelete(null);
    setOpenDeleteDialog(false);
  };

  const confirmDeleteAssignment = async () => {
    if (assignmentToDelete) {
      try {
        await deleteAssignment(assignmentToDelete);
        toast.success("Assignment deleted successfully", { position: "bottom-center" });
      } catch (error) {
        toast.error("Failed to delete assignment", { position: "bottom-center" });
      } finally {
        handleCloseDeleteDialog();
      }
    }
  };

  const handleOpenAssignmentModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setOpenAssignmentModal(true);
  };

  const handleCloseAssignmentModal = () => {
    setOpenAssignmentModal(false);
    setSelectedAssignment(null);
  };

  const headCells = [
    { id: "Title", numeric: false, disablePadding: true, label: "Title" },
    { id: "DueDate", numeric: false, disablePadding: false, label: "Due Date" },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <Box
          className="container mx-auto mt-20 flex flex-col items-center justify-around lg:w-[1500px]"
          sx={{ width: "100%", height: "100vh" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => router.push("/Instructor/create")}
            >
              Add new Assignment
            </Button>
          </Box>

          {currentAssignments.length > 0 ? (
            currentAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment?._id}
                assignment={assignment}
                onEdit={() => handleEditAssignment(assignment?._id)}
                onDelete={() => handleDeleteAssignment(assignment?._id)}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                  <IconButton onClick={() => handleEditAssignment(assignment._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteAssignment(assignment._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    onClick={(event) => HandleNavigate(assignment._id, event)}
                    sx={{ marginLeft: 1 }}
                  >
                    View Responses
                  </Button>
                </Box>
              </AssignmentCard>
            ))
          ) : (
            <Typography variant="body1">No assignments available</Typography>
          )}

          <PaginationComponent
            currentPage={currentPage}
            totalItems={assignments ? assignments.length : 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </Box>
      ) : (
        <div className="w-full flex justify-center items-center">
          <Box
            sx={{
              width: "90%", // Set the width to 90% of the screen
              height: "100vh", // Full height of the viewport
              display: "flex",
              alignItems: "center", // Center vertically
              justifyContent: "center", // Center horizontally
              margin: "0 auto", // Ensure it's centered horizontally
            }}
          >
            <Grid container spacing={7} sx={{ margin: 0, padding: 0 }}>
              <Grid item xs={11} sx={{ margin: 0, padding: 0 }}>
                <EnhancedTable
                  data={assignments}
                  headCells={headCells}
                  title="List of Assignments"
                  onDelete={handleDeleteAssignment}
                  renderRowActions={(row) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button variant="outlined" onClick={() => handleEditAssignment(row._id)}>
                        Edit
                      </Button>
                      <Button variant="outlined" onClick={() => handleOpenAssignmentModal(row)}>
                        View
                      </Button>
                      <Button
                        variant="contained"
                        onClick={(event) => HandleNavigate(row._id, event)}
                      >
                        View Responses
                      </Button>
                    </Box>
                  )}
                  sx={{ width: "100%", margin: "0 auto" }} // Ensure table fills its container
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      )}

      {editingAssignment && (
        <UpdateAssignmentModal
          isOpen={openUpdateDialog}
          onClose={handleCloseUpdateDialog}
          assignmentId={editingAssignment._id}
          initialTitle={editingAssignment.Title}
          initialDescription={editingAssignment.Description}
          initialDate={editingAssignment.DueDate}
          onUpdate={() => console.log("Update Assignment")}
        />
      )}

      {assignmentToDelete && (
        <DeleteAssignmentModal
          isOpen={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onConfirm={confirmDeleteAssignment}
        />
      )}

      {selectedAssignment && (
        <AssignmentModal
          isOpen={openAssignmentModal}
          onOpenChange={handleCloseAssignmentModal}
          instructor={selectedAssignment.Instructor}
          date={selectedAssignment.DueDate}
          content={selectedAssignment.Description}
          resources={selectedAssignment.Resources}
          imageUrl={selectedAssignment.ImageUrl}
          assignmentId={selectedAssignment._id}
          placeholder="Add your response here"
        />
      )}
    </>
  );
};

export default Page;
