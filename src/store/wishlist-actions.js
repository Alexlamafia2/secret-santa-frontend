import { getAuthToken } from "../util/auth";
import baseFetchUrl from "../util/requests";
import { wishlistActions } from "./wishlist-slice";

export const fetchWishlistData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const token = getAuthToken();
      const response = await fetch(baseFetchUrl + "secret-santa/item", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        throw new Error("Sending Cart Data Failed!");
      }
      const data = await response.json();
      return data;
    };
    try {
      console.log("Success");
      const wishlistData = await fetchData();
      dispatch(
        wishlistActions.getWishlist({
          wishlist: wishlistData || [],
        })
      );
    } catch (error) {
      console.log("Error");
    }
  };
};

// ===================================
export const createWishlistItem = (newItem) => {
  return async (dispatch) => {
    const token = getAuthToken();
    console.log(token);
    const createItemBody = newItem.addItem || [];
    console.log("Create ITEM body ========");
    console.log(createItemBody);

    try {
      const response = await fetch(baseFetchUrl + "secret-santa/item", {
        method: "POST",
        body: JSON.stringify(createItemBody),
        headers: {
          "Content-Type": "application/JSON",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        throw new Error("Failed to respond to friend request");
      }

      dispatch(wishlistActions.clearAddItem());
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error (e.g., show a notification to the user).
      throw error;
    }
  };
};

// ===================================
export const deleteItemFromWishlist = (item) => {
  return async (dispatch) => {
    const token = getAuthToken();
    console.log(token);
    const deleteItemBody = item.deleteItem[0] || {};
    console.log("DELETE ITEM body ========");
    console.log(deleteItemBody);

    try {
      const response = await fetch(baseFetchUrl + "secret-santa/item/remove", {
        method: "POST",
        body: JSON.stringify(deleteItemBody),
        headers: {
          "Content-Type": "application/JSON",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        throw new Error("Failed to respond to friend request");
      }

      dispatch(wishlistActions.clearDeleteItem());
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error (e.g., show a notification to the user).
      throw error;
    }
  };
};

// ===================================
export const updateItemFromWishlist = (item) => {
  return async (dispatch) => {
    const token = getAuthToken();
    // console.log(token);
    const createBody = {
      itemId: item.itemId,
      name: item.name,
      itemUrl: item.itemUrl,
      groupId: item.groupId,
      userId: item.userId,
    };
    console.log("CREATE ITEM body ========");
    console.log(createBody);

    try {
      const response = await fetch(baseFetchUrl + "secret-santa/item/update", {
        method: "POST",
        body: JSON.stringify(createBody),
        headers: {
          "Content-Type": "application/JSON",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        console.error("Request failed with status:", response.status);
        throw new Error("Failed to respond to friend request");
      }
      dispatch(wishlistActions.clearUpdateItem());
      dispatch(fetchWishlistData());
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error (e.g., show a notification to the user).
      throw error;
    }
  };
};
