import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Create the plot and figure
fig, ax = plt.subplots(figsize=(8, 12))

# Set plot limits and aspect ratio
ax.set_xlim(0, 40)
ax.set_ylim(0, 60)
ax.set_aspect('equal', adjustable='box')
plt.axis('off')

# --- Define Plot Boundary ---
plot = patches.Rectangle((0, 0), 40, 60, linewidth=2, edgecolor='black', facecolor='none')
ax.add_patch(plot)
ax.text(20, 61, '40ft x 60ft Plot', ha='center', va='bottom', fontsize=12)


# --- Draw Rooms (x, y, width, height) ---

# 1. Living & Dining Room
living_room = patches.Rectangle((1, 16), 24, 22, linewidth=1, edgecolor='black', facecolor='#f0f0f0')
ax.add_patch(living_room)
ax.text(13, 27, 'Living & Dining\n24ft x 22ft', ha='center', va='center', fontsize=9)

# 2. Kitchen
kitchen = patches.Rectangle((25, 28), 14, 10, linewidth=1, edgecolor='black', facecolor='#f0f0f0')
ax.add_patch(kitchen)
ax.text(32, 33, 'Kitchen\n14ft x 10ft', ha='center', va='center', fontsize=9)

# 3. Master Bedroom
master_bedroom = patches.Rectangle((1, 42), 24, 17, linewidth=1, edgecolor='black', facecolor='#e0e0e0')
ax.add_patch(master_bedroom)
ax.text(13, 50.5, 'Master Bedroom\n24ft x 17ft', ha='center', va='center', fontsize=9)

# 4. Attached Bathroom 1
bathroom1 = patches.Rectangle((25, 48), 14, 11, linewidth=1, edgecolor='black', facecolor='#d0d0d0')
ax.add_patch(bathroom1)
ax.text(32, 53.5, 'Bathroom\n14ft x 11ft', ha='center', va='center', fontsize=9)

# 5. Bedroom 2 (Guest Room)
bedroom2 = patches.Rectangle((25, 16), 14, 12, linewidth=1, edgecolor='black', facecolor='#e0e0e0')
ax.add_patch(bedroom2)
ax.text(32, 22, 'Guest Room\n14ft x 12ft', ha='center', va='center', fontsize=9)

# 6. Bedroom 3 (Home Office)
bedroom3 = patches.Rectangle((1, 1), 19, 15, linewidth=1, edgecolor='black', facecolor='#e0e0e0')
ax.add_patch(bedroom3)
ax.text(10.5, 8.5, 'Home Office\n19ft x 15ft', ha='center', va='center', fontsize=9)

# 7. Bedroom 4 (Media Room)
bedroom4 = patches.Rectangle((20, 1), 19, 15, linewidth=1, edgecolor='black', facecolor='#e0e0e0')
ax.add_patch(bedroom4)
ax.text(29.5, 8.5, 'Media Room\n19ft x 15ft', ha='center', va='center', fontsize=9)

# --- Add Title ---
plt.title('Simple 4BHK Floor Plan', fontsize=16)
plt.show()
