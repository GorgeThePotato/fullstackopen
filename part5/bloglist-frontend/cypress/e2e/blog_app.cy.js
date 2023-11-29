describe("Blog", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "SuperAdminUser",
      username: "SuperAdminUser",
      password: "SuperAdminUser",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    const user2 = {
      name: "SuperAdminUser2",
      username: "SuperAdminUser2",
      password: "SuperAdminUser2",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Blogs");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get("#username").type("SuperAdminUser");
    cy.get("#password").type("SuperAdminUser");
    cy.get("#login-button").click();

    cy.contains("SuperAdminUser logged in");
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("wrong");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "Wrong username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "SuperAdminUser", password: "SuperAdminUser" });
    });

    it("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get(".title").type("blog created by cypress");
      cy.get(".author").type("Cypress");
      cy.get(".url").type("cypress.com");
      cy.contains("create").click();
      cy.contains("a new blog blog created by cypress by Cypress added");
    });

    it("a blog can be liked", function () {
      cy.createBlog({
        title: "blog created by cypress",
        author: "cypress",
        url: "cypress.com",
      });
      cy.get(".blog").contains("view").click();
      cy.get(".blog_details").contains("like").click();
    });

    it("a blog can be deleted by its creator", function () {
      cy.createBlog({
        title: "blog created by cypress",
        author: "cypress",
        url: "cypress.com",
      });
      cy.get(".blog").contains("view").click();
      cy.get(".blog_details").contains("remove").click();
    });

    it("only the creator sees the remove button", function () {
      cy.createBlog({
        title: "blog created by cypress",
        author: "cypress",
        url: "cypress.com",
      });
      cy.get(".blog").contains("view").click();
      cy.get(".blog_details").contains("remove");

      cy.login({ username: "SuperAdminUser2", password: "SuperAdminUser2" });
      cy.get(".blog").contains("view").click();
      cy.get(".blog_details").should("not.contain", "remove");
    });

    it("blogs are ordered based on likes", function () {
      cy.createBlog({
        title: "blog with 0 likes",
        author: "cypress",
        url: "cypress.com",
      });
      cy.createBlog({
        title: "blog with 4 likes",
        author: "cypress",
        url: "cypress.com",
      });
      cy.createBlog({
        title: "blog with 2 likes",
        author: "cypress",
        url: "cypress.com",
      });

      let waitTime = 2000;

      cy.get(".blog").eq(1).contains("view").click();
      cy.get(".blog_details").eq(1).contains("like").click();
      cy.wait(waitTime); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(".blog_details").contains("like").click();
      cy.wait(waitTime); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(".blog_details").contains("like").click();
      cy.wait(waitTime); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(".blog_details").contains("like").click();
      cy.wait(waitTime); // eslint-disable-line cypress/no-unnecessary-waiting

      cy.get(".blog").eq(2).contains("view").click();
      cy.get(".blog_details").eq(2).contains("like").click();
      cy.wait(waitTime); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(".blog_details").eq(1).contains("like").click();
      cy.wait(waitTime); // eslint-disable-line cypress/no-unnecessary-waiting

      cy.get(".blog").eq(0).should("contain", "blog with 4 likes");
      cy.get(".blog").eq(1).should("contain", "blog with 2 likes");
      cy.get(".blog").eq(2).should("contain", "blog with 0 likes");
    });
  });
});
