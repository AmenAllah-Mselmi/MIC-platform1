"use client";
import * as React from "react";
import {
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
} from "@mui/material";
import EnhancedTable from "../../_MICcomponents/Admin_UI/TableComponent/TableComponent";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import PaginationComponent from "../../_MICcomponents/PaginationComponent/PaginationComponent";
import { useAssignmentStore } from "@/app/store/MyStore/AssignmentsStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentCard from "../../_MICcomponents/assignment_UI/AssignmentCard";
import { Assignment } from "@/app/store/Models/Assignment";
import UpdateAssignmentModal from "../../_MICcomponents/assignment_UI/AssignementUpdateModal";
import DeleteAssignmentModal from "../../_MICcomponents/assignment_UI/AssignementDeleteModal";
import AssignmentModal from "../../_MICcomponents/assignment_UI/AssignmentModal";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Page: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation
  const assignments = useAssignmentStore((state) => state.assignments);
  const fetchAssignments = useAssignmentStore((state) => state.fetchAssignments);
  const deleteAssignment = useAssignmentStore((state) => state.deleteAssignment);
  const updateAssignment = useAssignmentStore((state) => state.updateAssignment);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);
  const [openAssignmentModal, setOpenAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

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
    const assignment = assignments.find((assignment) => assignment._id === id);
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
    setAssignmentToDelete(id);
    setOpenDeleteDialog(true);
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

  const headCells = [
    { id: "Title", numeric: false, disablePadding: true, label: "Title" },
    { id: "Description", numeric: false, disablePadding: true, label: "Description" },
    { id: "DueDate", numeric: false, disablePadding: false, label: "Due Date" },
    { id: "Attachments", numeric: false, disablePadding: false, label: "Attachments" },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleUpdateAssignment = async (id: string, updatedData: { title: string; description: string; dueDate: string }) => {
    try {
      await updateAssignment(id, updatedData);
      toast.success("Assignment updated successfully", { position: "bottom-center" });
      handleCloseUpdateDialog();
    } catch (error) {
      toast.error("Failed to update assignment", { position: "bottom-center" });
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
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={() => router.push("/Instructor/create")}>
              Add new Assignment
            </Button>
          </Box>

          {currentAssignments.length > 0 ? (
            currentAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                onEdit={() => handleEditAssignment(assignment._id)}
                onDelete={() => handleDeleteAssignment(assignment._id)}
                onOpenAssignmentModal={() => handleOpenAssignmentModal(assignment)} // Handle opening the modal
              />
            ))
          ) : (
            <Typography variant="body1">No assignments available</Typography>
          )}

          <PaginationComponent
            currentPage={currentPage}
            totalItems={assignments.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={7} sx={{ margin: 0, padding: 0 }}>
            <Grid item xs={12} md={8} sx={{ margin: 0, padding: 0 }}>
              <EnhancedTable
                data={assignments}
                headCells={headCells}
                title="List of Assignments"
                onDelete={handleDeleteAssignment}
                renderRowActions={(row) => (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outlined" onClick={() => handleEditAssignment(row._id)}>
                      Edit
                    </Button>
                  </Box>
                )}
                sx={{ width: '96%', margin: '0 auto' }} // Center the EnhancedTable
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ marginTop: { xs: 0, md: 0 }, padding: 0 }} />
          </Grid>
        </Box>
      )}

      {/* Dialogs for editing and deleting assignments */}
      {editingAssignment && (
        <UpdateAssignmentModal
          isOpen={openUpdateDialog}
          onClose={handleCloseUpdateDialog}
          assignmentId={editingAssignment._id}
          initialTitle={editingAssignment.Title}
          initialDescription={editingAssignment.Description}
          initialDate={editingAssignment.DueDate}
          onUpdate={handleUpdateAssignment}
        />
      )}

      {assignmentToDelete && (
        <DeleteAssignmentModal
          isOpen={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onConfirm={confirmDeleteAssignment}
        />
      )}

      {/* Assignment Modal for viewing details */}
      {selectedAssignment && (
        <AssignmentModal
          isOpen={openAssignmentModal}
          onClose={handleCloseAssignmentModal}
          assignment={selectedAssignment}
        />
      )}
    </>
  );
};

export default Page;
