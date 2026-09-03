"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  reorderProjects,
  uploadImage,
  Project,
} from "@/lib/projects";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  Testimonial,
} from "@/lib/testimonials";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Search,
  Star,
  UserCircle,
} from "lucide-react";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"projects" | "testimonials">(
    "projects",
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Project Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("Business");
  const [description, setDescription] = useState("");
  const [codeUrl, setCodeUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Testimonial Form fields
  const [clientName, setClientName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProjects();
        fetchTestimonials();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Close mobile sidebar when resizing to larger screens
  useEffect(() => {
    function onResize() {
      if (
        typeof window !== "undefined" &&
        window.innerWidth > 1079 &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sidebarOpen]);

  async function fetchProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTestimonials() {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message || "Invalid credentials");
    }
  }

  async function handleLogout() {
    await signOut(auth);
  }

  // Project Handlers
  function openAddProjectModal() {
    setEditingProject(null);
    setTitle("");
    setCategory("Business");
    setDescription("");
    setCodeUrl("");
    setLiveUrl("");
    setTags("");
    setImageFile(null);
    setImagePreview("");
    setIsProjectModalOpen(true);
  }

  function openEditProjectModal(project: Project) {
    setEditingProject(project);
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setCodeUrl(project.codeUrl);
    setLiveUrl(project.liveUrl);
    setTags(project.tags ? project.tags.join(", ") : "");
    setImageFile(null);
    setImagePreview(project.image);
    setIsProjectModalOpen(true);
  }

  // Testimonial Handlers
  function openAddTestimonialModal() {
    setEditingTestimonial(null);
    setClientName("");
    setClientRole("");
    setClientCompany("");
    setQuote("");
    setRating(5);
    setAvatarFile(null);
    setAvatarPreview("");
    setIsTestimonialModalOpen(true);
  }

  function openEditTestimonialModal(item: Testimonial) {
    setEditingTestimonial(item);
    setClientName(item.name);
    setClientRole(item.role);
    setClientCompany(item.company || "");
    setQuote(item.quote);
    setRating(item.rating);
    setAvatarFile(null);
    setAvatarPreview(item.avatar || "");
    setIsTestimonialModalOpen(true);
  }

  function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
    isAvatar = false,
  ) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isAvatar) {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  }

  async function handleProjectSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageUrl = editingProject?.image || "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const parsedTags = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      if (editingProject && editingProject.id) {
        await updateProject(editingProject.id, {
          title,
          category,
          description,
          codeUrl,
          liveUrl,
          tags: parsedTags,
          image: imageUrl,
        });
      } else {
        await addProject({
          title,
          category,
          description,
          codeUrl,
          liveUrl,
          tags: parsedTags,
          image: imageUrl,
          order: projects.length,
        });
      }

      setIsProjectModalOpen(false);
      await fetchProjects();
    } catch (error: any) {
      console.error("Error saving project:", error);
      alert(error.message || "Failed to save project.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleTestimonialSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      let avatarUrl = editingTestimonial?.avatar || "";
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile);
      }

      const payload: Omit<Testimonial, "id"> = {
        name: clientName,
        role: clientRole,
        company: clientCompany,
        quote,
        rating,
        avatar: avatarUrl,
        order: editingTestimonial
          ? editingTestimonial.order
          : testimonials.length,
      };

      if (editingTestimonial && editingTestimonial.id) {
        await updateTestimonial(editingTestimonial.id, payload);
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === editingTestimonial.id
              ? { id: editingTestimonial.id, ...payload }
              : t,
          ),
        );
      } else {
        const id = await addTestimonial(payload);
        setTestimonials((prev) => [...prev, { id, ...payload }]);
      }

      setIsTestimonialModalOpen(false);
    } catch (error: any) {
      console.error("Error saving testimonial:", error);
      alert(error.message || "Failed to save testimonial.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteProject(project: Project) {
    if (!project.id || !confirm(`Delete "${project.title}"?`)) return;

    try {
      await deleteProject(project.id);
      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  async function handleDeleteTestimonial(testimonial: Testimonial) {
    if (
      !testimonial.id ||
      !confirm(`Delete testimonial from "${testimonial.name}"?`)
    )
      return;

    try {
      await deleteTestimonial(testimonial.id);
      setTestimonials((prev) => prev.filter((t) => t.id !== testimonial.id));
    } catch (err) {
      console.error("Failed to delete testimonial:", err);
    }
  }

  async function handleMoveProject(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const reordered = [...projects];
    const [movedItem] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, movedItem);

    const updatedProjects = reordered.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    setProjects(updatedProjects);

    const payload = updatedProjects
      .filter((p) => p.id !== undefined)
      .map((p) => ({ id: p.id!, order: p.order }));

    await reorderProjects(payload);
  }

  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (p.title || "").toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q) ||
      (p.tags || []).join(", ").toLowerCase().includes(q)
    );
  });

  const filteredTestimonials = testimonials.filter((t) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      (t.name || "").toLowerCase().includes(q) ||
      (t.quote || "").toLowerCase().includes(q) ||
      (t.company || "").toLowerCase().includes(q) ||
      (t.role || "").toLowerCase().includes(q)
    );
  });

  const projectsToShow = filteredProjects;
  const testimonialsToShow = filteredTestimonials;
  const featuredProjects = filteredProjects.slice(0, 3);
  const averageRating =
    filteredTestimonials.length > 0
      ? (
          filteredTestimonials.reduce((sum, item) => sum + item.rating, 0) /
          filteredTestimonials.length
        ).toFixed(1)
      : "0.0";

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading admin panel...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-glow-1" />
        <div className="login-glow-2" />

        <form onSubmit={handleLogin} className="admin-login-card">
          <div className="login-header">
            <div className="login-badge">
              <span>Security Portal</span>
            </div>
            <h1 className="admin-title">Admin Sign In</h1>
            <p className="admin-subtitle">
              Enter your credentials to access the workspace.
            </p>
          </div>

          {authError && <div className="admin-error-box">{authError}</div>}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              placeholder="admin@brandme.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="admin-btn-primary">
            <span>Sign In</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container admin-dashboard-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-office">
          <div className="admin-office-mark">B</div>
          <div>
            <strong>BrandME</strong>
            <span>Main office</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin sections">
          <button
            className="admin-side-link is-active"
            onClick={() => setSidebarOpen(false)}
            type="button"
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className={`admin-side-link ${activeTab === "projects" ? "is-selected" : ""}`}
            onClick={() => {
              setActiveTab("projects");
              setSidebarOpen(false);
            }}
            type="button"
          >
            <FolderKanban size={18} />
            <span>Projects</span>
          </button>
          <button
            className={`admin-side-link ${activeTab === "testimonials" ? "is-selected" : ""}`}
            onClick={() => {
              setActiveTab("testimonials");
              setSidebarOpen(false);
            }}
            type="button"
          >
            <MessageSquareQuote size={18} />
            <span>Testimonials</span>
          </button>
          <a className="admin-side-link" href="/">
            <ArrowRight size={18} />
            <span>View site</span>
          </a>
        </nav>

        <div className="admin-sidebar-card">
          <BarChart3 size={34} />
          <strong>Grow the portfolio</strong>
          <span>
            Add projects and testimonials to keep the public site fresh.
          </span>
          <button
            onClick={
              activeTab === "projects"
                ? openAddProjectModal
                : openAddTestimonialModal
            }
            type="button"
          >
            Add content
          </button>
        </div>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <button
            className="mobile-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <div
            className="admin-search"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  color: "#ffffffff",
                  pointerEvents: "none",
                }}
              />
              <input
                type="search"
                placeholder="Search projects & testimonials"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{
                  width: "18rem",
                  padding: "0.5rem 0.75rem 0.5rem 2.5rem", //
                }}
                aria-label="Search content"
              />
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="admin-btn-icon"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="admin-profile">
            <span>{user.email || "Admin user"}</span>
            <button
              onClick={handleLogout}
              className="admin-logout-btn"
              type="button"
              aria-label="Sign out"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {sidebarOpen && (
          <div
            className="admin-sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="admin-main admin-dashboard-main">
          <div className="admin-page-heading">
            <div className="admin-head">
              <span className="admin-kicker">Workspace</span>
              <h1>BrandME Control Center</h1>
            </div>
            <div className="admin-range-pill">Portfolio and reviews</div>
          </div>

          <section className="admin-metrics-grid" aria-label="Content overview">
            <div className="admin-metric-card">
              <div className="admin-metric-icon flame">
                <FolderKanban size={24} />
              </div>
              <strong>{projects.length}</strong>
              <span>Projects</span>
              <small>Live case studies</small>
            </div>
            <div className="admin-metric-card">
              <div className="admin-metric-icon gold">
                <MessageSquareQuote size={24} />
              </div>
              <strong>{testimonials.length}</strong>
              <span>Testimonials</span>
              <small>Published feedback</small>
            </div>
            <div className="admin-metric-card">
              <div className="admin-metric-icon green">
                <Star size={24} />
              </div>
              <strong>{averageRating}</strong>
              <span>Average rating</span>
              <small>Client trust score</small>
            </div>
            <div className="admin-metric-card">
              <div className="admin-metric-icon violet">
                <CheckCircle2 size={24} />
              </div>
              <strong>{projects.length + testimonials.length}</strong>
              <span>Total entries</span>
              <small>Site records</small>
            </div>
          </section>

          <section className="admin-content-grid">
            <div className="admin-panel admin-panel-wide">
              {/* Show tab bar only when NOT searching, or show a search header when searching */}
              {searchQuery.trim() === "" ? (
                <div className="admin-tabbar">
                  <button
                    onClick={() => setActiveTab("projects")}
                    className={`admin-tab ${activeTab === "projects" ? "active-tab" : ""}`}
                    type="button"
                  >
                    <FolderKanban size={18} />
                    <span>Projects ({projects.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("testimonials")}
                    className={`admin-tab ${activeTab === "testimonials" ? "active-tab" : ""}`}
                    type="button"
                  >
                    <MessageSquareQuote size={18} />
                    <span>Testimonials ({testimonials.length})</span>
                  </button>
                </div>
              ) : (
                <div
                  className="admin-dashboard-top"
                  style={{ padding: "1rem 0" }}
                >
                  <div>
                    <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                      Search Results for "{searchQuery}"
                    </h2>
                    <p className="admin-subtitle">
                      Found {filteredProjects.length} projects and{" "}
                      {filteredTestimonials.length} testimonials
                    </p>
                  </div>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="btn-secondary"
                    style={{ width: "auto" }}
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* IF SEARCHING: Show both filtered lists together */}
              {searchQuery.trim() !== "" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    marginTop: "1rem",
                  }}
                >
                  {/* Projects Search Results */}
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>
                      Matching Projects ({filteredProjects.length})
                    </h3>
                    <div className="table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Project</th>
                            <th>Category</th>
                            <th style={{ textAlign: "right" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProjects.length === 0 ? (
                            <tr>
                              <td
                                colSpan={3}
                                style={{
                                  textAlign: "center",
                                  color: "#6b7280",
                                  padding: "1rem",
                                }}
                              >
                                No matching projects found.
                              </td>
                            </tr>
                          ) : (
                            filteredProjects.map((project) => (
                              <tr key={project.id}>
                                <td>
                                  <div style={{ fontWeight: 600 }}>
                                    {project.title}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "0.75rem",
                                      color: "#6b7280",
                                    }}
                                  >
                                    {project.description}
                                  </div>
                                </td>
                                <td>
                                  <span className="badge">
                                    {project.category}
                                  </span>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <button
                                    onClick={() =>
                                      openEditProjectModal(project)
                                    }
                                    className="btn-secondary"
                                    style={{
                                      fontSize: "0.75rem",
                                      padding: "0.25rem 0.625rem",
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Testimonials Search Results */}
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>
                      Matching Testimonials ({filteredTestimonials.length})
                    </h3>
                    <div className="table-container">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Client</th>
                            <th>Quote</th>
                            <th style={{ textAlign: "right" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTestimonials.length === 0 ? (
                            <tr>
                              <td
                                colSpan={3}
                                style={{
                                  textAlign: "center",
                                  color: "#6b7280",
                                  padding: "1rem",
                                }}
                              >
                                No matching testimonials found.
                              </td>
                            </tr>
                          ) : (
                            filteredTestimonials.map((item) => (
                              <tr key={item.id}>
                                <td style={{ fontWeight: 600 }}>{item.name}</td>
                                <td
                                  style={{
                                    color: "#374151",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  "{item.quote}"
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <button
                                    onClick={() =>
                                      openEditTestimonialModal(item)
                                    }
                                    className="btn-secondary"
                                    style={{
                                      fontSize: "0.75rem",
                                      padding: "0.25rem 0.625rem",
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* NORMAL TABS VIEW */}
                  {activeTab === "projects" && (
                    <>
                      <div className="admin-dashboard-top">
                        <div>
                          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                            Projects
                          </h2>
                          <p className="admin-subtitle">
                            Manage, edit, upload, and reorder your portfolio
                            items
                          </p>
                        </div>
                        <button
                          onClick={openAddProjectModal}
                          className="btn-primary"
                          style={{ width: "auto" }}
                        >
                          + Add Project
                        </button>
                      </div>

                      <div className="table-container">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th style={{ width: "4rem" }}>Order</th>
                              <th>Project</th>
                              <th>Category</th>
                              <th>Tags</th>
                              <th style={{ textAlign: "right" }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projectsToShow.map((project, idx) => (
                              <tr key={project.id}>
                                <td>
                                  <div
                                    style={{ display: "flex", gap: "0.25rem" }}
                                  >
                                    <button
                                      disabled={idx === 0}
                                      onClick={() =>
                                        handleMoveProject(idx, "up")
                                      }
                                      className="btn-icon"
                                    >
                                      ▲
                                    </button>
                                    <button
                                      disabled={idx === projects.length - 1}
                                      onClick={() =>
                                        handleMoveProject(idx, "down")
                                      }
                                      className="btn-icon"
                                    >
                                      ▼
                                    </button>
                                  </div>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "0.75rem",
                                    }}
                                  >
                                    <div>
                                      <div style={{ fontWeight: 600 }}>
                                        {project.title}
                                      </div>
                                      <div
                                        style={{
                                          fontSize: "0.75rem",
                                          color: "#6b7280",
                                        }}
                                      >
                                        {project.description}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="badge">
                                    {project.category}
                                  </span>
                                </td>
                                <td
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#6b7280",
                                  }}
                                >
                                  {project.tags?.join(", ") || "—"}
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      gap: "0.5rem",
                                    }}
                                  >
                                    <button
                                      onClick={() =>
                                        openEditProjectModal(project)
                                      }
                                      className="btn-secondary"
                                      style={{
                                        fontSize: "0.75rem",
                                        padding: "0.25rem 0.625rem",
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteProject(project)
                                      }
                                      className="btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

                  {activeTab === "testimonials" && (
                    <>
                      <div className="admin-dashboard-top">
                        <div>
                          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                            Testimonials
                          </h2>
                          <p className="admin-subtitle">
                            Manage client reviews and feedback
                          </p>
                        </div>
                        <button
                          onClick={openAddTestimonialModal}
                          className="btn-primary"
                          style={{ width: "auto" }}
                        >
                          + Add Testimonial
                        </button>
                      </div>

                      <div className="table-container">
                        <table className="admin-table">
                          <thead>
                            <tr>
                              <th>Client</th>
                              <th>Role / Company</th>
                              <th>Quote</th>
                              <th>Rating</th>
                              <th style={{ textAlign: "right" }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {testimonialsToShow.length === 0 ? (
                              <tr>
                                <td
                                  colSpan={5}
                                  style={{
                                    textAlign: "center",
                                    color: "#6b7280",
                                    padding: "2rem",
                                  }}
                                >
                                  No testimonials found.
                                </td>
                              </tr>
                            ) : (
                              testimonialsToShow.map((item) => (
                                <tr key={item.id}>
                                  <td style={{ fontWeight: 600 }}>
                                    {item.name}
                                  </td>
                                  <td
                                    style={{
                                      color: "#6b7280",
                                      fontSize: "0.875rem",
                                    }}
                                  >
                                    {item.role}
                                    {item.company ? ` at ${item.company}` : ""}
                                  </td>
                                  <td
                                    style={{
                                      color: "#374151",
                                      fontSize: "0.875rem",
                                      maxWidth: "20rem",
                                    }}
                                  >
                                    "{item.quote}"
                                  </td>
                                  <td>⭐ {item.rating}</td>
                                  <td style={{ textAlign: "right" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: "0.5rem",
                                      }}
                                    >
                                      <button
                                        onClick={() =>
                                          openEditTestimonialModal(item)
                                        }
                                        className="btn-secondary"
                                        style={{
                                          fontSize: "0.75rem",
                                          padding: "0.25rem 0.625rem",
                                        }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteTestimonial(item)
                                        }
                                        className="btn-danger"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            <aside className="admin-panel admin-highlight-panel">
              <div>
                <span className="admin-kicker">Recent work</span>
                <h2>Publish-ready assets</h2>
                <p>
                  Track the work and client proof that shape the public BrandME
                  site.
                </p>
              </div>

              <div className="admin-mini-list">
                {featuredProjects.length === 0 ? (
                  <span>No projects yet.</span>
                ) : (
                  featuredProjects.map((project) => (
                    <div
                      className="admin-mini-item"
                      key={project.id ?? project.title}
                    >
                      <span>{project.title}</span>
                      <small>{project.category}</small>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={
                  activeTab === "projects"
                    ? openAddProjectModal
                    : openAddTestimonialModal
                }
                className="admin-highlight-action"
                type="button"
              >
                Add new {activeTab === "projects" ? "project" : "testimonial"}
              </button>
            </aside>
          </section>
        </main>

        {/* PROJECT MODAL */}
        {isProjectModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem" }}>
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <form
                onSubmit={handleProjectSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="Business">Business</option>
                    <option value="E-Learning">E-Learning</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Code URL</label>
                    <input
                      type="url"
                      value={codeUrl}
                      onChange={(e) => setCodeUrl(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Live URL</label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, Tailwind"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project Screenshot</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, false)}
                    className="form-input"
                    style={{ padding: "0.25rem" }}
                  />
                  {imagePreview && (
                    <div
                      className="image-preview-wrapper"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "10rem",
                        marginTop: "0.5rem",
                        borderRadius: "0.25rem",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ width: "auto" }}
                  >
                    {submitting ? "Saving..." : "Save Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TESTIMONIAL MODAL */}
        {isTestimonialModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.25rem" }}>
                {editingTestimonial
                  ? "Edit Testimonial"
                  : "Add New Testimonial"}
              </h3>
              <form
                onSubmit={handleTestimonialSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Client Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Role / Position</label>
                    <input
                      type="text"
                      required
                      placeholder="CEO"
                      value={clientRole}
                      onChange={(e) => setClientRole(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Company (Optional)</label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rating (1 to 5)</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="form-select"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Quote / Feedback</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter client testimonial here..."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Client Avatar / Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, true)}
                    className="form-input"
                    style={{ padding: "0.25rem" }}
                  />
                  {avatarPreview && (
                    <div
                      style={{
                        position: "relative",
                        width: "4rem",
                        height: "4rem",
                        marginTop: "0.5rem",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "1px solid #1e293b",
                      }}
                    >
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setIsTestimonialModalOpen(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ width: "auto" }}
                  >
                    {submitting ? "Saving..." : "Save Testimonial"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
