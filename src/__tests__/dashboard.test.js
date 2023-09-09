import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../pages/dashboard/dash";

// Mock the useParams function
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "kevin" }),
}));

describe("Dashboard Component", () => {
  test("Renders dashboard with recent projects and daily tasks", async () => {
    render(<Dashboard />);

    // You can use screen queries to check if certain elements are present
    const dashboardHeader = screen.getByText("Dashboard");
    const welcomeHeader = screen.getByText("Welcome 123");
    const addTaskButton = screen.getByText("Add Task");

    // You can also test user interactions
    fireEvent.change(screen.getByPlaceholderText("Add Task"), {
      target: { value: "Test Task" },
    });
    fireEvent.click(addTaskButton);

    // Assert that the task was added
    const addedTask = await screen.findByText("Test Task");

    // Perform additional assertions as needed
    expect(dashboardHeader).toBeInTheDocument();
    expect(welcomeHeader).toBeInTheDocument();
    expect(addedTask).toBeInTheDocument();
  });
});
