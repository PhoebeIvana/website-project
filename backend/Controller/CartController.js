import { CartModel, User } from "../Schema/Schema.js";

export const AddToCartFunction = async (req, res) => {
  const { userId, item_id, quantity, size, price } = req.body;

  try {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ item_id, quantity, size, price }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.item_id.equals(item_id)
      );
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ item_id, quantity, size, price });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding to cart." });
  }
};

export const GetCartFunction = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await CartModel.findOne({ userId }).populate('items.item_id');

    if (!cart) {
      return res.status(404).json({ error: "Cart not found for this user." });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the cart." });
  }
};



export const RemoveFromCartFunction = async (req, res) => {
  const userId = req.params.userId;
  const item_id = req.params.id;

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found for this user." });
    }
    cart.items = cart.items.filter((item) => !item.item_id.equals(item_id));
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while removing from cart." });
  }
};

export const UpdateCartFunction = async (req, res) => {
  const { userId, item_id, quantity, size } = req.body;

  try {
    if (quantity > 0) {
      // Update the item quantity and size if quantity is greater than 0
      const updatedCart = await CartModel.findOneAndUpdate(
        { userId, "items.item_id": item_id },
        {
          $set: {
            "items.$.quantity": quantity,
            "items.$.size": size,
          },
        },
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).json({ error: "Item not found in cart" });
      }
      res.json(updatedCart);
    } else {
      // Remove the item from the cart if quantity is 0
      const updatedCart = await CartModel.findOneAndUpdate(
        { userId },
        {
          $pull: {
            items: { item_id: item_id },
          },
        },
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).json({ error: "Item not found in cart" });
      }
      res.json(updatedCart);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the cart." });
  }
};


export const DeleteCartFunction = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Retrieve the user's information
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the user's cart
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Calculate the total cost of the cart
    const totalCartCost = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Check if the user's balance is sufficient
    if (totalCartCost > user.balance) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Subtract the total cost of the cart from the user's balance
    user.balance -= totalCartCost;
    await user.save();

    // Delete the cart
    const deletedCart = await CartModel.findOneAndDelete({ userId });

    // Return the deleted cart data
    const updatedUser = await User.findById(userId);
    res.json({ cart: deletedCart, user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};