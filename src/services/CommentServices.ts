import { ApiResponse } from "@/interface/AuthTypes";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/`;

export const fetchComments = async (caseId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}?case_id=${caseId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { 
        success: false, 
        message: "Failed to fetch comments.",
        error: await response.text() 
      };
    }

    const data = await response.json();
    return { 
      success: true, 
      message: "Comments fetched successfully", 
      data 
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { 
      success: false, 
      message: "An error occurred while fetching comments.",
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const addComment = async (caseId: string, content: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        case: caseId,
        content
      }),
    });

    if (!response.ok) {
      return { 
        success: false, 
        message: "Failed to add comment.",
        error: await response.text() 
      };
    }

    const data = await response.json();
    return { 
      success: true, 
      message: "Comment added successfully", 
      data 
    };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { 
      success: false, 
      message: "An error occurred while adding comment.",
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

// Optional: Add these if you need update and delete functionality
export const updateComment = async (commentId: string, content: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${commentId}/`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      return { 
        success: false, 
        message: "Failed to update comment.",
        error: await response.text() 
      };
    }

    const data = await response.json();
    return { 
      success: true, 
      message: "Comment updated successfully", 
      data 
    };
  } catch (error) {
    console.error("Error updating comment:", error);
    return { 
      success: false, 
      message: "An error occurred while updating comment.",
      error: error instanceof Error ? error.message : String(error)
    };
  }
};

export const deleteComment = async (commentId: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${commentId}/`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      return { 
        success: false, 
        message: "Failed to delete comment.",
        error: await response.text() 
      };
    }

    return { 
      success: true, 
      message: "Comment deleted successfully" 
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { 
      success: false, 
      message: "An error occurred while deleting comment.",
      error: error instanceof Error ? error.message : String(error)
    };
  }
};