router.get('/', protect, getAllLocations);
router.get('/:locId', protect, getLocationById);