import api from "./api";

export const getAllProjects = async () => {
  const res = await api.get("/projects/project-detail");
  return res.data?.data || res.data || [];
};

export const createProjectService = async (payload) => {
  const res = await api.post("/projects/", payload);
  return res.data;
};


export const updateProjectService = async (projectId, payload) => {
  const res = await api.put(
    `/projects/update-project/${projectId}`,
    payload
  );
  return res.data;
};

/* ---------------- GET PROJECT BY ID ---------------- */
export const getProjectById = async (id) => {
  const res = await api.get(`/projects/project-detail/${id}`);
  return res.data?.data;
};

export const getDashboardMetrics = async () => {
  const res = await api.get("/projects/dashboard-metrics");
  return res.data?.data;
};

export const uploadProjectDocument = async (projectId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post(
    `/projects/${projectId}/document`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data?.data;
};


export const deleteProjectService = async (projectId) => {
  const res = await api.delete(`/projects/delete-project/${projectId}`);
  return res.data;
};

export const removeProjectMember = async (projectId, memberId) => {
  const res = await api.delete(
    `/projects/${projectId}/members/${memberId}`
  );
  return res.data;
};

export const deleteProjectDocument = async (projectId, documentId) => {
  const res = await api.delete(`/projects/${projectId}/document/${documentId}`);
  return res.data;
};
