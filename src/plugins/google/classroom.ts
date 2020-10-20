import { GoogleUserData } from "./../types";
import { classroom_v1, google as googleAPI, oauth2_v2 } from "googleapis";
import { google } from "../google";

class classroomUser {
	private classroom: classroom_v1.Classroom;
	private getClassroomInstance(userData: GoogleUserData) {
		return googleAPI.classroom({
			version: "v1",
			auth: google.createUser_oAuth2Client(userData),
		});
	}

	constructor(userData: GoogleUserData) {
		this.classroom = this.getClassroomInstance(userData);
	}

	async getInstance(): Promise<classroom_v1.Classroom> {
		return this.classroom;
	}

	courses = {
		list: async () => {
			let coursesList = await this.classroom.courses.list();
			return coursesList.data.courses;
		},
		get: async (courseID: string) => {
			let course = await this.classroom.courses.get({ id: courseID });
			return course.data;
		},
	};

	announcements = {
		list: async (courseID: string) => {
			let announcementsList = await this.classroom.courses.announcements.list({
				courseId: courseID,
			});
			return announcementsList.data.announcements;
		},
	};
}

export { classroomUser };