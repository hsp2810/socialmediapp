import { ID } from "appwrite";

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { Query } from "@tanstack/react-query";

export async function createUserAccount(user: INewUser) {
  try {
    const { name, email, password } = user;
    // This only adds account in the Auth
    const newAccount = await account.create(ID.unique(), email, password, name);

    // We also need to add the account to the database
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials();

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      password: newAccount.password as string,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  password: string;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentUser() {
  try {
    console.log("Checking the Account");
    const currentAccount = await account.get();
    console.log("Got the current account: ", currentAccount);

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId[currentAccount.$id]
    );

    if (!currentUser) throw Error();

    console.log(currentUser);
  } catch (error) {
    console.log(error);
  }
}
