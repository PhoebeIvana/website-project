import { CartModel } from "../Schema/Schema.js";

export const AddToCartFunction = async (req, res) => {
  const { userId, item_id, quantity, size } = req.body;

  try {
    let cart = await CartModel.findOne({ userId });
    if (!cart) {
      cart = new CartModel({
        userId,
        items: [{ item_id, quantity, size }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.item_id.equals(item_id)
      );
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ item_id, quantity, size });
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
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId },
      { item_id, quantity, size },
      { new: true }
    );
    //returning the updated data
    if (!updatedCart) {
      return res.status(404).json({ error: "item not found" });
    }
    res.json(updatedCart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the data." });
  }
};