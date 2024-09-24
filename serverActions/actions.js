"use server";

import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (prevState, formData) => {
	const title = formData.get("title");
	const image = formData.get("image");
	const content = formData.get("content");

	let errors = [];
	if (!title || title.trim() === "") {
		errors.push("Please enter a title");
	}

	if (!content || content.trim() === "") {
		errors.push("Please enter content");
	}

	if (!image || image.size === 0) {
		errors.push("Please upload an image");
	}

	if (errors.length > 0) {
		return { errors };
	}

	await storePost({
		imageUrl: "",
		title,
		content,
		userId: 1,
	});

	revalidatePath("/", "layout");
	redirect("/feed");
};

export const togglePostLikeStatus = async (postId) => {
	updatePostLikeStatus(postId, 2);
	revalidatePath("/feed");
};
