const { Member } = require('../models/user')
const { department } = require('../models/department')
const controller = {
  // modifier par mariem
  afficher_All: async (req, res) => {
    try {
      const Members = await Member.find()
        .select('NomPrenom ImageLink Departement -__t') // Sélectionner seulement ces trois champs
        .exec()

      if (!Members || Members.length === 0) {
        return res.status(404).json({ message: 'Aucun membre trouvé.' })
      }
      res.status(200).json(Members)
    } catch (error) {
      console.error('Erreur lors de la récupération des membres:', error) // Affiche l'erreur dans la console
      res.status(500).json({
        message: 'Erreur lors de la génération des membres',
        error: error.message
      })
    }
  },

  create_Member: async (req, res) => {
    try {
      const { departmentId, MemberData } = req.body 

      const Mydepartment = await department.findById(departmentId) 
      if (!Mydepartment) {
        return res.status(404).json({ message: 'Department not found' })
      }
console.log("hello")
      const AddMember = new Member({
        ...MemberData,
        DepartmentId: departmentId
      })
      console.log(AddMember)
      const savedMember = await AddMember.save()
      Mydepartment.Members.push(savedMember._id) 
      await Mydepartment.save() 
      return res.status(201).json({
        message: 'Member added successfully',
        Member: savedMember
      })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'Error adding Member to department' })
    }
  },

  update_Member: async (req, res) => {
    try {
      const id = req.params.id
      const update = await Member.updateOne({ _id: id }, req.body)
      if (update.nModified === 0) {
        return res
          .status(404)
          .json({ message: 'Member not found or no changes made' })
      }
      res.status(200).json({ message: 'Member updated successfully' })
    } catch (error) {
      res.status(404).json({ message: 'Error in updating Member' })
    }
  },

  delete_Member: async (req, res) => {
    try {
      const id = req.params.id
      const deleted = await Member.deleteOne({ _id: id })
      if (deleted.deletedCount === 0) {
        return res.status(404).json({ message: 'Member not found' })
      }
      res.status(200).json({ message: 'Member deleted successfully' })
    } catch (error) {
      res.status(404).json({ message: 'Error in deleting Member' })
    }
  },

  findMember: async (req, res) => {
    try {
      const id = req.params.id
      const member = await Member.findById(id)

      if (!member) {
        return res.status(404).json({ message: "This Member doesn't exist" })
      }

      return res.status(200).json(member)
    } catch (error) {
      console.error('Error in finding Member:', error)
      return res.status(400).json({ message: 'Error in finding Member' })
    }
  },

  count: async (req, res) => {
    try {
      const Members = await Member.countDocuments()
      res.status(200).json(Members)
    } catch (error) {
      res.status(404).json({ message: 'Error in counting Members' })
    }
  }

  
}

module.exports = controller
