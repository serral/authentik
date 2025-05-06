import SessionPage, {
    BAD_PASSWORD,
    BAD_USERNAME,
    GOOD_PASSWORD,
    GOOD_USERNAME,
} from "../pageobjects/session.page.js";
import UserLibraryPage from "../pageobjects/user-library.page.js";
import { navigateBrowser } from "../utils/navigation.js";

describe("Session management", () => {
    beforeEach(async () => {
        await SessionPage.logout();
        await navigateBrowser();
    });

    it("should login with valid credentials and reach the UserLibrary", async () => {
        await SessionPage.login({ username: GOOD_USERNAME, password: GOOD_PASSWORD });
        await expect(UserLibraryPage.$pageHeading).resolves.toHaveText("My applications");
    });

    it("fails on a bad username", async () => {
        await SessionPage.submitUsernameStage(BAD_USERNAME);
        await SessionPage.submitPasswordStage(GOOD_PASSWORD);

        await expect(SessionPage.$authFailureMessage).resolves.toBeDisplayedInViewport();
        await expect(SessionPage.$authFailureMessage).resolves.toHaveText("Invalid password");
    });

    it("fails on a bad password", async () => {
        await SessionPage.submitUsernameStage(GOOD_USERNAME);
        await SessionPage.submitPasswordStage(BAD_PASSWORD);

        await expect(SessionPage.$authFailureMessage).resolves.toBeDisplayedInViewport();
        await expect(SessionPage.$authFailureMessage).resolves.toHaveText("Invalid password");
    });
});
